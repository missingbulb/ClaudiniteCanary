// canary world rule — the packs list in .claudinite-settings.json still names
// `local/canary` itself, the one condition none of this pack's siblings check:
// pack-intact.mjs proves pack.mjs and RULES.md are still on disk, pack-shape.mjs
// proves their arrays still hold a rule per scope and a skill, but neither looks
// at whether the declaration that makes this pack reachable at all is still
// there. Drop it and every rule in this file — including those two — goes dark
// with no red anywhere, because a pack the loader never activates runs nothing.
//
// A LIVENESS PROBE, not an opinion — same non-firing-by-design shape as its
// siblings: in normal operation the declaration is untouched and this never
// fires.
//
// Dependency-free: plain finding objects, no imports out of `.claudinite/shared/`.
const id = 'canary/canary-declared';
const severity = 'blocking';
const doc = '.claudinite/local/packs/canary/RULES.md';
const why =
  'the packs list in .claudinite-settings.json is what makes this pack reachable at all — drop ' +
  'the entry and every rule this pack carries, including the ones proving it still loads, stops running';

const SETTINGS_FILE = '.claudinite-settings.json';

function declaresLocalCanary(packs) {
  if (!Array.isArray(packs)) return false;
  return packs.some((entry) => entry === 'local/canary' || (entry && typeof entry === 'object' && entry.id === 'local/canary'));
}

export default {
  id,
  severity,
  description: `${SETTINGS_FILE} declares "local/canary" in its packs list`,
  doc,
  why,

  run(ctx) {
    const text = ctx.read(SETTINGS_FILE);
    if (text === null) return []; // a missing settings file is a different, louder failure elsewhere

    let settings;
    try {
      settings = JSON.parse(text);
    } catch {
      return []; // malformed JSON is a different rule's job
    }
    if (declaresLocalCanary(settings.packs)) return [];

    return [{
      rule: id,
      severity,
      file: SETTINGS_FILE,
      line: null,
      what: `${SETTINGS_FILE} no longer declares "local/canary" in its "packs" list`,
      why,
      fix: 'add "local/canary" back to "packs" in .claudinite-settings.json — dropping it silently disables this repo\'s whole local pack',
      doc,
    }];
  },
};
