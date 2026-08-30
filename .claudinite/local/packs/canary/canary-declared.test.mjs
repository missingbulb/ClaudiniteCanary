import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from './canary-declared.mjs';

const SETTINGS_FILE = '.claudinite-settings.json';

function fakeCtx(packs) {
  return { read: (path) => (path === SETTINGS_FILE ? JSON.stringify({ packs }) : null) };
}

test('missing settings file is left to a louder failure elsewhere', () => {
  const findings = rule.run({ read: () => null });
  assert.deepEqual(findings, []);
});

test('unparsable settings file is left to a different rule', () => {
  const findings = rule.run({ read: (path) => (path === SETTINGS_FILE ? 'not json' : null) });
  assert.deepEqual(findings, []);
});

test('fires when "local/canary" is missing from packs', () => {
  const findings = rule.run(fakeCtx(['basics', { id: 'git-github', version: '1' }]));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, SETTINGS_FILE);
  assert.match(findings[0].what, /no longer declares "local\/canary"/);
});

test('stays quiet when "local/canary" is declared as a bare string', () => {
  const findings = rule.run(fakeCtx(['basics', 'local/canary']));
  assert.deepEqual(findings, []);
});

test('stays quiet when "local/canary" is declared as an object entry', () => {
  const findings = rule.run(fakeCtx([{ id: 'local/canary' }]));
  assert.deepEqual(findings, []);
});
