// canary world rule — the artifacts that make this repo a realistic Claudinite
// member (beyond the vendored mount, covered by mount-present.mjs, and this
// pack's own manifest/prose, covered by pack-intact.mjs) are present.
//
// A LIVENESS PROBE, not an opinion — RULES.md's "Stay a realistic member" names
// the hooks config and the scheduler/conformance workflows alongside the mount
// and the pack; this is the part of that bullet no other check covers. It can
// only fire when this repo has quietly stopped carrying one of them, which in
// normal operation never happens — same non-firing-by-design shape as its
// siblings, so a real opinion never rides in here.
//
// Dependency-free: plain finding objects, no imports out of `.claudinite/shared/`.
const id = 'canary/realism-artifacts';
const severity = 'blocking';
const doc = '.claudinite/local/packs/canary/RULES.md';
const why =
  'the canary only means something while it is a real member — without the hooks or the workflows a rehearsal ' +
  'against a candidate ref proves nothing about consumers';

const REQUIRED = [
  '.claude/settings.json',
  '.github/workflows/claudinite-scheduler.yml',
  '.github/workflows/claudinite-conformance.yml',
];

export default {
  id,
  severity,
  description: 'the hooks config and the scheduler/conformance workflows are present',
  doc,
  why,

  run(ctx) {
    return REQUIRED.filter((f) => !ctx.exists(f)).map((file) => ({
      rule: id,
      severity,
      file,
      line: null,
      what: `${file} is missing — this repo no longer carries a piece of what makes it a realistic Claudinite member`,
      why,
      fix: 'restore the file (from git history, or by re-running the canon\'s adoption/converge-wiring against this repo)',
      doc,
    }));
  },
};
