// gymsafe work rule — a change to product code lands with docs/requirements.md.
//
// Work scope, so it judges the branch in front of the session at the Stop hook
// rather than re-auditing the repo: a session that touched no product code is
// never asked. It is the timing half of RULES.md's requirements rule — that the
// document moves WITH the change — which is exactly the half that failed. Three
// days of drift cost four hours of retroactive archaeology (~40 requirements and
// ~10 API specs missing) because every individual change felt too small to
// document, and none of them could be seen from the next one.
//
// Advisory, and one finding for the branch rather than one per file: plenty of
// changes genuinely document nothing — a refactor, a dependency bump — so the
// job here is to ask the question at the moment it is cheap to answer, not to
// block on an answer only the author has.
//
// Dependency-free: plain finding objects, no imports.
const severity = 'advisory';
const doc = '.claudinite/local/packs/gymsafe/RULES.md';
const why =
  'requirements written after the fact are written from memory — the drift is invisible until somebody '
  + 'audits the whole document, and by then it is hours of archaeology rather than a line per change';

const REQUIREMENTS = 'docs/requirements.md';
const PRODUCT = /^(backend|frontend)\/src\/.*\.tsx?$/;
const TEST = /\.(test|spec)\.tsx?$/;

const rule = {
  id: 'gymsafe/requirements-synced',
  severity,
  description: 'a branch touching backend/src or frontend/src also touches docs/requirements.md',
  doc,
  why,
  scope: 'work',

  run(work) {
    if (work.changedFiles.includes(REQUIREMENTS)) return [];
    const touched = work.changedFiles.filter((f) => PRODUCT.test(f) && !TEST.test(f));
    if (touched.length === 0) return [];
    return [{
      rule: rule.id,
      severity,
      file: touched[0],
      line: null,
      what: `${touched.length} product file(s) changed, ${REQUIREMENTS} did not`,
      why,
      fix: `update the user story, functional requirement, API spec or config parameter this change moves in ${REQUIREMENTS} — or say in the PR why none of them moved`,
      doc,
    }];
  },
};

export default rule;
