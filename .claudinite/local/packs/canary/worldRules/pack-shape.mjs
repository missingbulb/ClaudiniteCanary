// canary world rule — the pack's own tree still carries the two-scope-dispatch-
// plus-skill-mounting shape RULES.md's "Keep the local pack loading" bullet
// requires, not just that pack.json and RULES.md exist on disk (that part is
// pack-intact.mjs's job, gated on the change touching this dir).
//
// A LIVENESS PROBE, not an opinion — a scope folder emptied of checks, or a
// skill directory without its SKILL.md, is not a config error the pack loader
// would catch (the pack still loads), so a session that drains one silently
// proves nothing next rehearsal even though the pack still "loads".
//
// Reads the tracked file list rather than importing anything, so this stays a
// plain scan like its siblings.
//
// Dependency-free: plain finding objects, no imports out of `.claudinite/shared/`.
const id = 'canary/pack-shape';
const severity = 'blocking';
const doc = '.claudinite/local/packs/canary/RULES.md';
const why =
  'the two-scope dispatch and skill mounting this pack proves are only proven while each scope folder ' +
  'carries a check and every bundled skill has its SKILL.md';

const DIR = '.claudinite/local/packs/canary/';
const SCOPES = ['worldRules', 'workRules'];
const SKILLS_DIR = `${DIR}skills/`;

const childrenOf = (files, prefix) => files.filter((f) => f.startsWith(prefix)).map((f) => f.slice(prefix.length));

export default {
  id,
  severity,
  description: 'each scope folder carries at least one check, and the pack bundles at least one skill with its SKILL.md',
  doc,
  why,

  run(ctx) {
    const files = ctx.files ?? [];
    const out = [];
    const flag = (file, what, fix) => out.push({ rule: id, severity, file, line: null, what, why, fix, doc });

    for (const scope of SCOPES) {
      const checks = childrenOf(files, `${DIR}${scope}/`).filter((f) => !f.includes('/') && f.endsWith('.mjs') && !f.endsWith('.test.mjs'));
      if (checks.length === 0) {
        flag(`${DIR}${scope}/`, `holds no check in ${scope}/`, `add at least one ${scope === 'worldRules' ? 'world' : 'work'}-scope check module — an empty folder proves nothing about its dispatch`);
      }
    }
    const skills = [...new Set(childrenOf(files, SKILLS_DIR).filter((f) => f.includes('/')).map((f) => f.split('/')[0]))];
    if (skills.length === 0) {
      flag(SKILLS_DIR, 'declares no bundled skills', 'add at least one skills/<name>/SKILL.md — no skill proves nothing about skill mounting');
    }
    for (const name of skills) {
      const skillFile = `${SKILLS_DIR}${name}/SKILL.md`;
      if (!files.includes(skillFile)) {
        flag(skillFile, `bundles skill "${name}" but ${skillFile} is missing`, `add ${skillFile}, or remove the skills/${name}/ directory`);
      }
    }
    return out;
  },
};
