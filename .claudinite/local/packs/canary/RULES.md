# Canary rules

This repo is the **live canary** for Claudinite's consumer-safety gate. It is not a product. It
carries no application code and it is meant to be disposable.

The canon's `canary-rehearsal.yml` workflow converges this repo against a candidate canon ref and
asks one question: *does a real member still work?* Everything here exists to make that question
answerable.

## Standing rules

- **Stay a realistic member.** The value of a canary is that it is real. Keep the vendored mount at
  `.claudinite/shared/`, the declaration, the hooks, the scheduler workflow, the conformance
  workflow, and this local pack. A stub proves nothing.
- **Keep the local pack loading.** `local/canary` is declared in `.claudinite-settings.json`. It
  must keep a valid `pack.mjs`, a rule in each scope, at least one bundled skill, and this file.
  That combination — manifest parse, two-scope dispatch, skill mounting — is the shape that
  broke the fleet in canon #555, and it is the shape this repo exists to cover.
- **The canary's own rules stay trivial.** They prove the pack loaded; they do not enforce anything
  about this repo. A rule with real opinions would turn the canary red for reasons unrelated to the
  canon ref under test, which destroys the only signal this repo produces.
- **Divergence from `main` is expected and disposable.** A rehearsal may leave this repo converged
  against a candidate ref. Re-baselining it to canon `main` is always the right repair; there is no
  local state here worth preserving.
