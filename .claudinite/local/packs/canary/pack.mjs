import mountPresent from './mount-present.mjs';
import packIntact from './pack-intact.mjs';

// The `canary` pack: this repo's own LOCAL Claudinite pack
// (.claudinite/local/packs/ — tracked project content, discovered and run by the
// same engine as the canon packs, declared by hand as `local/canary` in
// .claudinite-checks.json).
//
// WHY IT EXISTS. ClaudiniteCanary is the live canary for the canon's
// consumer-safety gate: canon CI cannot prove a canon change is safe for
// consumers, so the canon's canary-rehearsal workflow converges THIS repo
// against a candidate ref and asks whether it still works. That question is only
// worth asking if the canary looks like a real member — and the shape that
// actually broke the fleet (canon #555) is the LOCAL PACK: a manifest the loader
// must parse, rules in both scopes the runners must dispatch, and bundled skills
// the mounter must link. A canon change that silently stops loading local packs
// has to fail here, loudly, before it reaches a member that carries real rules.
//
// So the rules below are deliberately trivial and deliberately non-firing. Their
// job is to PROVE THE PACK LOADED, not to enforce anything about this repo — a
// rule with real opinions would make the canary red for reasons that have
// nothing to do with the canon ref under test, which is the one signal this repo
// exists to produce.
//
// A local pack is always declared by hand (never fingerprinted by --init, never
// seeded), so detect/marker stay null. Its skills live INSIDE the pack
// (skills/<name>/SKILL.md); the engine mounts them from here, not from the canon
// skills tree.
export default {
  id: 'canary',
  ruleRoutingGuidance: {
    belongs: "rules proving this repo's Claudinite mount, pack loader, rule dispatch and skill mounting still work",
    excludes: 'real engineering opinions — portable practice lives in the vendored canon packs, not in the canary',
  },
  detect: null,
  marker: null,
  prose: 'RULES.md',
  worldRules: [mountPresent],
  workRules: [packIntact],
  skills: ['canary-role'],
};
