// gymsafe world rule — a decision log's `inputs` and `outcome` carry something,
// and its `decision` names a branch.
//
// The half of RULES.md's semantic bar a script can see. It cannot judge whether
// a log answers a user's question — that stays prose — but it can catch the
// shape that provably answers nothing: `inputs: {}`, `outcome: {}`, or a
// `decision` so generic ("computed", "processed") that knowing it fired tells a
// reader which of the siblings matched.
//
// Advisory, not blocking: an empty object is always wrong, but the generic-name
// list is a judgement call a reviewer may overrule, and one gate over both keeps
// the two halves of the same bar reported together.
//
// Dependency-free, and comment-stripped through its sibling's exported pass, for
// the reason that module's header gives.
import { stripComments } from './decision-log-fr-known.mjs';

const severity = 'advisory';
const doc = '.claudinite/local/packs/gymsafe/RULES.md';
const why =
  'a logDecision with an empty inputs or outcome, or a decision name that fits every branch, passes the '
  + 'traceability gate while answering no question a user or reviewer will actually ask';

const SOURCE = /^(backend|frontend)\/src\/.*\.tsx?$/;
const TEST = /\.(test|spec)\.tsx?$/;

// Names that describe that something happened rather than WHICH rule fired.
const GENERIC = new Set([
  'computed', 'processed', 'done', 'handled', 'finished', 'complete', 'completed',
  'calculated', 'evaluated', 'updated', 'result', 'ok', 'success',
]);

// The call's argument object, by brace matching from the `(` — a regex cannot,
// since inputs/outcome are themselves brace-nested.
export function callArgument(code, open) {
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
  id: 'gymsafe/decision-log-substantive',
  severity,
  description: 'each logDecision call carries a non-empty inputs and outcome and a branch-specific decision name',
  doc,
  why,

  run(ctx) {
    const out = [];
    const flag = (file, line, what, fix) => out.push({ rule: rule.id, severity, file, line, what, why, fix, doc });

    for (const file of ctx.files.filter((f) => SOURCE.test(f) && !TEST.test(f))) {
      const text = ctx.read(file);
      if (text === null) continue;
      const code = stripComments(text);
      for (const m of code.matchAll(/\blogDecision\s*\(/g)) {
        const arg = callArgument(code, m.index);
        if (arg === null) continue;
        const line = code.slice(0, m.index).split('\n').length;

        for (const field of ['inputs', 'outcome']) {
          if (new RegExp(`\\b${field}:\\s*\\{\\s*\\}`).test(arg)) {
            flag(file, line, `logs an empty \`${field}\``,
              `fill \`${field}\` with the fields a reviewer needs to reproduce this branch — raw inputs and the intermediate values derived from them, not just the final number`);
          }
        }

        const name = /\bdecision:\s*['"]([^'"]+)['"]/.exec(arg)?.[1];
        if (name && GENERIC.has(name.toLowerCase())) {
          flag(file, line, `names the branch '${name}', which fits every branch here`,
            "name the branch that actually fired — 'status_chip_undertraining', not 'status_computed'");
        }
      }
    }
    return out;
  },
};

export default rule;
