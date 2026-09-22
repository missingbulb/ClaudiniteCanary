---
name: running-the-test-suites
description: GymSafe's test suites — where each lives, how to run it, and the Playwright E2E setup including one-time auth. Use when running or writing backend, frontend or end-to-end tests.
metadata:
  body: guidelines
  force-load-on-file-edits-paths:
    - "backend/src/**/*.test.ts"
    - "frontend/src/**/*.test.tsx"
    - "frontend/e2e/**"
---

# The test suites

| Suite | Lives in | Run with |
| --- | --- | --- |
| backend, Vitest | `backend/src/**/*.test.ts` | `cd backend && npm test` |
| frontend, Vitest + React Testing Library | `frontend/src/**/*.test.tsx` | `cd frontend && npm run test:run` |
| end-to-end, Playwright | `frontend/e2e/**/*.spec.ts` | `cd frontend && npm run test:e2e` |

Run all three before deploying. `npx tsc --noEmit` is a separate obligation, not covered by any of
them — Vitest runs through esbuild and skips type errors the Docker build fails on.

## End-to-end

Write an E2E test for critical user workflows (auth, injury management, workout sync,
recommendations), for a bug fix spanning multiple components or pages, and for behaviour that is
browser-specific — navigation, forms, dialogs.

```bash
cd frontend
npx playwright test --headed auth.setup.ts   # one-time: sign in and save the auth state
npm run test:e2e                             # headless
npm run test:e2e:ui                          # UI mode, for debugging
npm run test:e2e:headed                      # watch the browser
npm run test:e2e:debug                       # breakpoints
npm run test:e2e:report                      # the report from the last run
```

Auth state lands in `playwright/.auth/user.json` (gitignored) and the Google OAuth tokens expire
after about an hour — re-run `auth.setup.ts` when tests start failing at the sign-in step rather
than at an assertion. `frontend/e2e/README.md` holds the alternative auth methods.

For interactive exploration, screenshots and debugging, the `/playwright` skill drives a browser
directly — `/playwright open https://gym-progression-copilot.web.app`.

## Keeping E2E tests worth having

- cover the happy path and the key error scenarios, not every branch — the unit suites are for that
- add `data-testid` to the elements tests select on; selectors built from copy break on a wording change
- mock external APIs where possible
- `test.skip()` for a test needing data setup that does not exist yet, rather than a flaky one
- screenshots on failure are configured already

```typescript
test('should resolve an injury', async ({ page }) => {
  await page.goto('/injuries');
  await page.getByRole('button', { name: /resolve/i }).first().click();
  await expect(page.getByText(/resolved injuries/i)).toBeVisible();
});
```
