// canary work rule — a session that edits the canary pack must leave it loadable.
//
// Work scope, so it judges the change in front of the session (the Stop hook),
// not the repo at rest: it only looks when the branch actually touched the pack
// directory. A session that never goes near it is never asked about it.
//
// Like its world-scope sibling this is a liveness probe with a real edge case
// attached — deleting `pack.mjs` or `RULES.md` while keeping the `local/canary`
// declaration turns every later session into a blocking `config` error at load,
// which is the least debuggable way for this repo to break. In normal operation
// it never fires; its job is to prove work-scope dispatch reached a local pack.
//
// Dependency-free by the same rule as the world-scope module: plain finding
// objects, no imports out of `.claudinite/shared/`.
const id = 'canary/pack-intact';
const severity = 'blocking';
const doc = '.claudinite/local/packs/canary/RULES.md';
const why =
  'the declaration names local/canary — if the manifest or its prose goes missing the pack ' +
  'loader raises a blocking config error on every later session, in this repo and in every rehearsal of it';

const DIR = '.claudinite/local/packs/canary/';
const REQUIRED = [`${DIR}pack.mjs`, `${DIR}RULES.md`];

export default {
  id,
  severity,
  description: 'a change touching the canary pack leaves its manifest and prose in place',
  doc,
  why,
  scope: 'work',

  run(work) {
    if (!work.changedFiles.some((f) => f.startsWith(DIR))) return [];
    return REQUIRED.filter((f) => !work.exists(f)).map((file) => ({
      rule: id,
      severity,
      file,
      line: null,
      what: `${file} is gone, but .claudinite-settings.json still declares local/canary`,
      why,
      fix: `restore ${file}, or drop "local/canary" from the "packs" list in .claudinite-settings.json`,
      doc,
    }));
  },
};
