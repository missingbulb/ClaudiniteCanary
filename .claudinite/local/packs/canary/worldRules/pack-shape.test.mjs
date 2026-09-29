import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from './pack-shape.mjs';

const DIR = '.claudinite/local/packs/canary/';
const CLEAN = [
  `${DIR}pack.json`,
  `${DIR}worldRules/mount-present.mjs`,
  `${DIR}worldRules/mount-present.test.mjs`,
  `${DIR}workRules/pack-intact.mjs`,
  `${DIR}skills/canary-role/SKILL.md`,
];

const run = (files) => rule.run({ files });

test('stays quiet when each scope folder holds a check and every skill has its SKILL.md', () => {
  assert.deepEqual(run(CLEAN), []);
});

test('fires when worldRules/ holds no check', () => {
  const files = CLEAN.filter((f) => !f.includes('/worldRules/'));
  assert.ok(run(files).some((f) => /no check in worldRules/.test(f.what)));
});

test('a test module alone does not count as a check', () => {
  const files = CLEAN.filter((f) => f !== `${DIR}worldRules/mount-present.mjs`);
  assert.ok(run(files).some((f) => /no check in worldRules/.test(f.what)));
});

test('fires when workRules/ holds no check', () => {
  const files = CLEAN.filter((f) => !f.includes('/workRules/'));
  assert.ok(run(files).some((f) => /no check in workRules/.test(f.what)));
});

test('fires when the pack bundles no skill', () => {
  const files = CLEAN.filter((f) => !f.includes('/skills/'));
  assert.ok(run(files).some((f) => /no bundled skills/.test(f.what)));
});

test('fires when a skill directory has no SKILL.md', () => {
  const files = [...CLEAN.filter((f) => !f.endsWith('SKILL.md')), `${DIR}skills/canary-role/notes.md`];
  assert.ok(run(files).some((f) => /canary-role.*SKILL\.md/.test(f.what)));
});
