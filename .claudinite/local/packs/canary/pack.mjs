import mountPresent from './mount-present.mjs';
import packIntact from './pack-intact.mjs';
import realismArtifacts from './realism-artifacts.mjs';
import packShape from './pack-shape.mjs';

// The `canary` pack: this repo's own LOCAL Claudinite pack, declared by hand as
// `local/canary` in .claudinite-settings.json. Its rules only prove the pack
// loaded - manifest parse, two-scope dispatch, skill mounting - so they stay
// trivial and non-firing. Its skills live inside the pack (skills/<name>/SKILL.md).
export default {
  id: 'canary',
  ruleRoutingGuidance: {
    belongs: "rules proving this repo's Claudinite mount, pack loader, rule dispatch and skill mounting still work",
    excludes: 'real engineering opinions — portable practice lives in the vendored canon packs, not in the canary',
  },
  detect: null,
  marker: null,
  prose: 'RULES.md',
  worldRules: [mountPresent, realismArtifacts, packShape],
  workRules: [packIntact],
  skills: ['canary-role'],
};
