import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from './requirements-synced.mjs';

const fakeWork = (changedFiles) => ({ changedFiles });

test('fires when product code moved and the document did not', () => {
  const findings = rule.run(fakeWork(['backend/src/engine.ts', 'frontend/src/App.tsx']));
  assert.equal(findings.length, 1);
  assert.match(findings[0].what, /2 product file/);
});

test('stays quiet when the document moved with it', () => {
  assert.deepEqual(rule.run(fakeWork(['backend/src/engine.ts', 'docs/requirements.md'])), []);
});

test('a branch that touched no product code is never asked', () => {
  assert.deepEqual(rule.run(fakeWork(['README.md', 'package.json'])), []);
});

test('a test-only change is not a behaviour change to document', () => {
  assert.deepEqual(rule.run(fakeWork(['backend/src/engine.test.ts'])), []);
});

test('one finding for the branch, not one per file', () => {
  const findings = rule.run(fakeWork(['backend/src/a.ts', 'backend/src/b.ts', 'backend/src/c.ts']));
  assert.equal(findings.length, 1);
});
