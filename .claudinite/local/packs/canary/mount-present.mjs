// canary world rule — the vendored mount is present and carries the engine's
// world-sweep entry point.
//
// This is a LIVENESS PROBE, not an opinion. If the pack loader ever stops
// discovering local packs, this rule stops running and the canary's world sweep
// goes quiet rather than red — so the rule is paired with the selftest, which
// asserts the rule was dispatched at all. What this rule itself catches is the
// other half: a converge that lands a declaration without the tree it declares.
//
// It can only fire when the mount is missing, and when the mount is missing the
// sweep could not have started from it — so in normal operation it never fires.
// That is the point: a canary rule that has opinions makes the canary red for
// reasons unrelated to the canon ref under test.
//
// Local-pack check modules are dependency-free on purpose: plain finding
// objects, no imports out of `.claudinite/shared/` — committed consumer code
// must not reach into the vendored canon (the `claudinite-isolation` rule
// enforces this), because that tree is refreshed nightly and refactored
// upstream.
const id = 'canary/mount-present';
const severity = 'blocking';
const doc = '.claudinite/local/packs/canary/RULES.md';
const why =
  'the canary only means something while it is a real member — without the vendored mount ' +
  'a rehearsal against a canon ref proves nothing about consumers';

const ENTRY = '.claudinite/shared/engine/checks/check_the_world.mjs';

export default {
  id,
  severity,
  description: 'the vendored Claudinite mount is present at .claudinite/shared/',
  doc,
  why,

  run(ctx) {
    if (ctx.exists(ENTRY)) return [];
    return [{
      rule: id,
      severity,
      file: ENTRY,
      line: null,
      what: `${ENTRY} is missing — the vendored mount is absent or incomplete`,
      why,
      fix: 'force this repo\'s own update task (dispatch claudinite-scheduler.yml with wake: "update") and watch it land — never apply-vendor-set.mjs by hand, which silently skips migration records on an already-stamped repo',
      doc,
    }];
  },
};
