import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadDeclaredChecks } from '../../../shared/engine/checks/helpers/pattern-rules.mjs';

// Loads THIS pack's actual declared-checks.json through the same compiler the
// engine uses, so the fixture proves the shipped file, not a copy of it.
const [rule] = loadDeclaredChecks('.claudinite/local/packs/canary');

function fakeCtx(settingsText) {
  return { read: (path) => (path === '.claudinite-settings.json' ? settingsText : null), tracked: [], files: [] };
}

test('fires when the settings file omits local/canary from packs', () => {
  const findings = rule.run(fakeCtx(JSON.stringify({ packs: ['basics', { id: 'claudinite-lifecycle' }] })));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].rule, 'canary/pack-declared');
  assert.equal(findings[0].file, '.claudinite-settings.json');
});

test('stays quiet when local/canary is a bare string entry', () => {
  const findings = rule.run(fakeCtx(JSON.stringify({ packs: ['basics', 'local/canary'] })));
  assert.deepEqual(findings, []);
});

test('stays quiet when local/canary is declared as an object entry', () => {
  const findings = rule.run(fakeCtx(JSON.stringify({ packs: [{ id: 'local/canary', version: '1' }] })));
  assert.deepEqual(findings, []);
});

test('stays quiet when the settings file is missing entirely', () => {
  const findings = rule.run(fakeCtx(null));
  assert.deepEqual(findings, []);
});
