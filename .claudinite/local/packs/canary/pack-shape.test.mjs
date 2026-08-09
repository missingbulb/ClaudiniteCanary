import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from './pack-shape.mjs';

const PACK_FILE = '.claudinite/local/packs/canary/pack.mjs';
const SKILL_FILE = '.claudinite/local/packs/canary/skills/canary-role/SKILL.md';

const CLEAN_TEXT = `
export default {
  id: 'canary',
  worldRules: [mountPresent],
  workRules: [packIntact],
  skills: ['canary-role'],
};
`;

function fakeCtx({ text = CLEAN_TEXT, skillExists = true } = {}) {
  return {
    read: (path) => (path === PACK_FILE ? text : null),
    exists: (path) => (path === SKILL_FILE ? skillExists : false),
  };
}

test('missing pack.mjs is left to pack-intact.mjs', () => {
  const findings = rule.run({ read: () => null, exists: () => false });
  assert.deepEqual(findings, []);
});

test('fires when worldRules is empty', () => {
  const text = CLEAN_TEXT.replace('worldRules: [mountPresent]', 'worldRules: []');
  const findings = rule.run(fakeCtx({ text }));
  assert.ok(findings.some((f) => /no worldRules/.test(f.what)));
});

test('fires when workRules is empty', () => {
  const text = CLEAN_TEXT.replace('workRules: [packIntact]', 'workRules: []');
  const findings = rule.run(fakeCtx({ text }));
  assert.ok(findings.some((f) => /no workRules/.test(f.what)));
});

test('fires when skills is empty', () => {
  const text = CLEAN_TEXT.replace("skills: ['canary-role']", 'skills: []');
  const findings = rule.run(fakeCtx({ text }));
  assert.ok(findings.some((f) => /no bundled skills/.test(f.what)));
});

test('fires when a declared skill has no SKILL.md on disk', () => {
  const findings = rule.run(fakeCtx({ skillExists: false }));
  assert.ok(findings.some((f) => /canary-role.*missing/.test(f.what)));
});

test('stays quiet when the manifest and every skill file agree', () => {
  const findings = rule.run(fakeCtx());
  assert.deepEqual(findings, []);
});
