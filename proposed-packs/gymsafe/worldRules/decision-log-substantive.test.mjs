import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule, { callArgument } from './decision-log-substantive.mjs';

const RICH = `logDecision({
  fr: 'FR-PROG-016',
  decision: 'rep_gate_blocked',
  inputs: { bestRepsAtTopWeight: 6, repRangeMin: 8 },
  outcome: { action: 'repeat', targetLoad: 100 },
})`;

function fakeCtx(files) {
  return { files: Object.keys(files), read: (path) => files[path] ?? null };
}

test('fires on the token log — empty inputs and empty outcome', () => {
  const src = "logDecision({ fr: 'FR-X-001', decision: 'rep_gate_blocked', inputs: {}, outcome: {} })";
  const findings = rule.run(fakeCtx({ 'backend/src/engine.ts': src }));
  assert.equal(findings.length, 2);
  assert.ok(findings.some((f) => /empty `inputs`/.test(f.what)));
  assert.ok(findings.some((f) => /empty `outcome`/.test(f.what)));
});

test('fires on a branch name that fits every branch', () => {
  const src = "logDecision({ decision: 'computed', inputs: { a: 1 }, outcome: { b: 2 } })";
  const findings = rule.run(fakeCtx({ 'backend/src/engine.ts': src }));
  assert.equal(findings.length, 1);
  assert.match(findings[0].what, /'computed'/);
});

test('a nested empty object is not the field itself', () => {
  const src = "logDecision({ decision: 'volume_floor_applied', inputs: { prior: {} , topWeight: 100 }, outcome: { action: 'cap' } })";
  assert.deepEqual(rule.run(fakeCtx({ 'backend/src/engine.ts': src })), []);
});

test('two calls in one file are judged separately', () => {
  const src = `${RICH}\n\nlogDecision({ decision: 'done', inputs: { a: 1 }, outcome: { b: 2 } })`;
  const findings = rule.run(fakeCtx({ 'backend/src/engine.ts': src }));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].line, 8);
});

test('stays quiet on a log rich enough to reproduce the branch', () => {
  assert.deepEqual(rule.run(fakeCtx({ 'backend/src/engine.ts': RICH })), []);
});

test('callArgument brace-matches past nested objects', () => {
  assert.equal(callArgument('logDecision({ a: { b: 1 } })', 11), '{ a: { b: 1 } }');
});
