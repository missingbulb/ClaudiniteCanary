// gymsafe world rule — every FR-ID a `logDecision` call names exists in
// docs/requirements.md.
//
// This is the drift the observability loop caught on its first deploy: engine.ts
// logged `FR-PROG-015: Rep completion gate` while the canonical id for that gate
// is FR-PROG-016 (015 is "Inferred conservative"). A hand-typed id in a log is
// load-bearing — /diagnose and /verify join code to requirement THROUGH it — and
// a typo silently unjoins them, so the check the human eye kept failing is the
// one a script does perfectly.
//
// Scanning the FILE rather than the diff: an id can also go stale from the other
// side, when requirements.md renumbers a requirement the code still logs.
//
// Dependency-free: plain finding objects, no imports — a consumer file must not
// reach into the vendored canon under .claudinite/shared/, which is replaced on
// every converge.
const severity = 'blocking';
const doc = '.claudinite/local/packs/gymsafe/RULES.md';
const why =
  'the FR-ID in a logDecision call is what /diagnose and /verify join code to its requirement through — '
  + 'an id requirements.md does not carry joins nothing, and looks instrumented while it does so';

const REQUIREMENTS = 'docs/requirements.md';
const SOURCE = /^(backend|frontend)\/src\/.*\.tsx?$/;
const TEST = /\.(test|spec)\.tsx?$/;

// Comment-stripping, string-aware, so a `//` inside a URL is not read as a comment
// and an id mentioned in prose above the call is not read as code. Inlined rather
// than imported from engine/checks/helpers/code-scanning.mjs for the isolation
// reason in the header.
export function stripComments(text) {
  let out = '';
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '/' && next === '/') { while (i < text.length && text[i] !== '\n') i += 1; continue; }
    if (c === '/' && next === '*') {
      i += 2;
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i += 1;
      i += 2;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') {
      out += c; i += 1;
      while (i < text.length && text[i] !== c) {
        if (text[i] === '\\') { out += text[i]; i += 1; }
        if (i < text.length) { out += text[i]; i += 1; }
      }
      out += text[i] ?? ''; i += 1;
      continue;
    }
    out += c; i += 1;
  }
  return out;
}

const FR_IN_CODE = /\bfr:\s*['"]((?:N?FR)-[A-Z0-9-]+)['"]/g;
const FR_IN_DOC = /\b(N?FR-[A-Z0-9-]+)\b/g;

const rule = {
  id: 'gymsafe/decision-log-fr-known',
  severity,
  description: 'every FR-ID named by a logDecision call is a requirement docs/requirements.md carries',
  doc,
  why,

  run(ctx) {
    const requirements = ctx.read(REQUIREMENTS);
    if (requirements === null) return []; // a repo without the document has nothing to drift from
    const known = new Set((requirements.match(FR_IN_DOC) ?? []));

    const out = [];
    for (const file of ctx.files.filter((f) => SOURCE.test(f) && !TEST.test(f))) {
      const text = ctx.read(file);
      if (text === null) continue;
      const code = stripComments(text);
      for (const m of code.matchAll(FR_IN_CODE)) {
        if (known.has(m[1])) continue;
        out.push({
          rule: rule.id,
          severity,
          file,
          line: code.slice(0, m.index).split('\n').length,
          what: `logs fr: '${m[1]}', which ${REQUIREMENTS} does not define`,
          why,
          fix: `use the canonical id from ${REQUIREMENTS}, or add the requirement there — then re-run \`npm run trace --prefix backend\``,
          doc,
        });
      }
    }
    return out;
  },
};

export default rule;
