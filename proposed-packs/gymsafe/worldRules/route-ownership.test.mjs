import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from './route-ownership.mjs';

const FILE = 'backend/src/routes/injuries.routes.ts';

const BUG = `
fastify.post('/api/v1/injuries/:injuryId/resolve', async (request, reply) => {
  const { injuryId } = request.params;
  const existing = await repository.getById(injuryId);
  if (!existing) return 404;
  await repository.resolve(injuryId);
});
`;

const FIXED = `
fastify.post('/api/v1/injuries/:injuryId/resolve', async (request, reply) => {
  const { injuryId } = request.params;
  const userId = request.userId;
  const existing = await repository.getById(injuryId);
  if (!existing) return 404;
  if (existing.userId !== userId) return 403;
  await repository.resolve(injuryId);
});
`;

function fakeCtx(files) {
  return { files: Object.keys(files), read: (path) => files[path] ?? null };
}

test('fires on the 2026-02-04 resolve endpoint', () => {
  const findings = rule.run(fakeCtx({ [FILE]: BUG }));
  assert.equal(findings.length, 1);
  assert.match(findings[0].what, /:injuryId/);
});

test('stays quiet once the ownership check is there', () => {
  assert.deepEqual(rule.run(fakeCtx({ [FILE]: FIXED })), []);
});

test('a collection route addresses no single resource', () => {
  const src = "fastify.get('/api/v1/injuries', async (request, reply) => { return repository.list(); });";
  assert.deepEqual(rule.run(fakeCtx({ [FILE]: src })), []);
});

test('a commented-out handler is not a live route', () => {
  assert.deepEqual(rule.run(fakeCtx({ [FILE]: `// ${BUG.trim().split('\n').join('\n// ')}` })), []);
});

test('only route files are scanned', () => {
  assert.deepEqual(rule.run(fakeCtx({ 'backend/src/services/injuries.service.ts': BUG })), []);
});
