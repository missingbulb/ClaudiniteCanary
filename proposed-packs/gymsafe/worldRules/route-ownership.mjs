// gymsafe world rule — a route handler addressing one resource by id reads the
// caller's userId somewhere in its body.
//
// The bug pattern found on 2026-02-04: the injuries resolve/delete endpoints
// fetched by id, 404'd when absent, and then acted — never comparing
// existing.userId to request.userId, so any authenticated caller could resolve
// anyone's injury. Every resource-scoped handler has the same shape, which is
// what makes the omission invisible by eye and trivial to scan for.
//
// Advisory: mentioning userId is not proof of a correct comparison, and a
// handler may legitimately delegate the check to a repository call. The finding
// is "look here", not "this is broken" — a blocking gate on a heuristic this
// coarse would be routed around rather than read.
//
// Dependency-free, comment-stripped through the FR-ID rule's exported pass.
import { stripComments } from './decision-log-fr-known.mjs';

const severity = 'advisory';
const doc = '.claudinite/local/packs/gymsafe/RULES.md';
const why =
  'a handler that resolves a resource by id without checking who owns it lets any authenticated caller '
  + "read or change another user's data — the shape that shipped in injuries.routes.ts";

const ROUTES = /^backend\/src\/.*\.routes\.tsx?$/;
const TEST = /\.(test|spec)\.tsx?$/;
const VERBS = 'get|post|put|patch|delete';

// The handler body, by brace matching from the route registration's `{`.
export function handlerBody(code, open) {
  const start = code.indexOf('{', open);
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < code.length; i += 1) {
    if (code[i] === '{') depth += 1;
    else if (code[i] === '}') {
      depth -= 1;
      if (depth === 0) return code.slice(start, i + 1);
    }
  }
  return null;
}

const rule = {
  id: 'gymsafe/route-ownership',
  severity,
  description: 'every route whose path addresses one resource by id reads userId in its handler',
  doc,
  why,

  run(ctx) {
    const out = [];
    const pattern = new RegExp(`\\.(?:${VERBS})\\s*\\(\\s*['"\`]([^'"\`]*:[A-Za-z]+[^'"\`]*)['"\`]`, 'g');

    for (const file of ctx.files.filter((f) => ROUTES.test(f) && !TEST.test(f))) {
      const text = ctx.read(file);
      if (text === null) continue;
      const code = stripComments(text);
      for (const m of code.matchAll(pattern)) {
        const body = handlerBody(code, m.index + m[0].length);
        if (body === null || /\buserId\b/.test(body)) continue;
        out.push({
          rule: rule.id,
          severity,
          file,
          line: code.slice(0, m.index).split('\n').length,
          what: `handles ${m[1]} without reading userId`,
          why,
          fix: 'fetch the resource, then return 403 unless its userId matches the caller\'s — before any read or write',
          doc,
        });
      }
    }
    return out;
  },
};

export default rule;
