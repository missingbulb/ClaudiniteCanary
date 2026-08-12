// canary world rule — the pack's own manifest still declares the two-scope-
// dispatch-plus-skill-mounting shape RULES.md's "Keep the local pack loading"
// bullet requires, not just that pack.mjs and RULES.md exist on disk (that
// part is pack-intact.mjs's job, gated on the change touching this dir).
//
// A LIVENESS PROBE, not an opinion — an emptied `worldRules`/`workRules`/
// `skills` array is not a config error the pack loader would catch (the
// manifest still parses), so a session that drains one silently proves
// nothing next rehearsal even though the pack still "loads". This is the
// half of canon #555's shape a load-time parse can't see: the arrays and the
// skill files they name have to actually agree with what's on disk.
//
// Reads pack.mjs as text rather than importing it, so this stays a plain
// scan like its siblings: no module side effects, no dependency on the
// runner's cwd resolving the sibling import correctly.
//
// Dependency-free: plain finding objects, no imports out of `.claudinite/shared/`.
const id = 'canary/pack-shape';
const severity = 'blocking';
const doc = '.claudinite/local/packs/canary/RULES.md';
const why =
  'the manifest parse, two-scope dispatch and skill mounting this pack proves are only proven while pack.mjs ' +
  'actually declares a rule in each scope and every skill it names is on disk';

const DIR = '.claudinite/local/packs/canary/';
const PACK_FILE = `${DIR}pack.mjs`;
const SKILLS_DIR = `${DIR}skills/`;

function arrayBody(text, key) {
  const m = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`).exec(text);
  return m ? m[1].trim() : null;
}

export default {
  id,
  severity,
  description: 'pack.mjs declares at least one rule per scope and one skill, and every declared skill exists on disk',
  doc,
  why,

  run(ctx) {
    const text = ctx.read(PACK_FILE);
    if (text === null) return []; // pack-intact.mjs already covers a missing manifest

    const out = [];
    const flag = (what, fix) => out.push({ rule: id, severity, file: PACK_FILE, line: null, what, why, fix, doc });

    const worldRules = arrayBody(text, 'worldRules');
    if (!worldRules) {
      flag('declares no worldRules', 'list at least one world-scope rule — an empty array proves nothing about world-scope dispatch');
    }
    const workRules = arrayBody(text, 'workRules');
    if (!workRules) {
      flag('declares no workRules', 'list at least one work-scope rule — an empty array proves nothing about work-scope dispatch');
    }
    const skillsBody = arrayBody(text, 'skills');
    const skillNames = skillsBody ? [...skillsBody.matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]) : [];
    if (skillNames.length === 0) {
      flag('declares no bundled skills', 'list at least one skill — an empty array proves nothing about skill mounting');
    }
    for (const name of skillNames) {
      const skillFile = `${SKILLS_DIR}${name}/SKILL.md`;
      if (!ctx.exists(skillFile)) {
        flag(`declares skill "${name}" but ${skillFile} is missing`, `add ${skillFile}, or drop "${name}" from pack.mjs's skills list`);
      }
    }
    return out;
  },
};
