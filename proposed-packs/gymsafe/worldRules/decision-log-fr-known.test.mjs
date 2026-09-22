import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule, { stripComments } from './decision-log-fr-known.mjs';

const REQUIREMENTS = 'docs/requirements.md';
const DOC = '### FR-PROG-015 Inferred conservative\n### FR-PROG-016 Rep completion gate\n### NFR-OBS-001 Decision logging\n';

function fakeCtx(files, doc = DOC) {
  return {
    files: Object.keys(files),
    read: (path) => (path === REQUIREMENTS ? doc : files[path] ?? null),
  };
}

test('no requirements document means nothing to drift from', () => {
  const ctx = fakeCtx({ 'backend/src/engine.ts': "logDecision({ fr: 'FR-NOPE-001' })" }, null);
  assert.deepEqual(rule.run(ctx), []);
});

test('fires on the Face Pull drift — an id the document does not carry', () => {
  const ctx = fakeCtx({ 'backend/src/engine.ts': "logDecision({ fr: 'FR-PROG-017', decision: 'rep_gate_blocked' })" });
  const findings = rule.run(ctx);
  assert.equal(findings.length, 1);
  assert.match(findings[0].what, /FR-PROG-017/);
  assert.equal(findings[0].file, 'backend/src/engine.ts');
});

test('reports the line the call is on', () => {
  const ctx = fakeCtx({ 'backend/src/engine.ts': `const a = 1;\n\nlogDecision({ fr: 'FR-GONE-001' })` });
  assert.equal(rule.run(ctx)[0].line, 3);
});

test('an id only mentioned in a comment is not code', () => {
  const ctx = fakeCtx({ 'backend/src/engine.ts': "// historical: fr: 'FR-PROG-015' was wrong here\nlogDecision({ fr: 'FR-PROG-016' })" });
  assert.deepEqual(rule.run(ctx), []);
});

test('test files are out of scope', () => {
  const ctx = fakeCtx({ 'backend/src/engine.test.ts': "logDecision({ fr: 'FR-MADE-UP' })" });
  assert.deepEqual(rule.run(ctx), []);
});

test('stays quiet when every logged id is canonical', () => {
  const ctx = fakeCtx({
    'backend/src/engine.ts': "logDecision({ fr: 'FR-PROG-016' })",
    'frontend/src/App.tsx': "logEvent({ fr: 'NFR-OBS-001' })",
  });
  assert.deepEqual(rule.run(ctx), []);
});

test('stripComments leaves a URL inside a string alone', () => {
  assert.match(stripComments("const u = 'https://example.com/a'; // gone"), /https:\/\/example\.com\/a/);
  assert.doesNotMatch(stripComments("const u = 'https://example.com/a'; // gone"), /gone/);
});
