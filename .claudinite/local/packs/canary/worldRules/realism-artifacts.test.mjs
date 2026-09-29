import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from './realism-artifacts.mjs';

const REQUIRED = [
  '.claude/settings.json',
  '.github/workflows/claudinite-scheduler.yml',
  '.github/workflows/claudinite-conformance.yml',
];

function fakeCtx(present) {
  return { exists: (path) => present.includes(path) };
}

test('fires when a realism artifact is missing', () => {
  const present = REQUIRED.filter((f) => f !== '.github/workflows/claudinite-scheduler.yml');
  const findings = rule.run(fakeCtx(present));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, '.github/workflows/claudinite-scheduler.yml');
  assert.equal(findings[0].rule, 'canary/realism-artifacts');
});

test('fires once per missing artifact when several are gone', () => {
  const findings = rule.run(fakeCtx([]));
  assert.equal(findings.length, REQUIRED.length);
});

test('stays quiet when every artifact is present', () => {
  const findings = rule.run(fakeCtx(REQUIRED));
  assert.deepEqual(findings, []);
});
