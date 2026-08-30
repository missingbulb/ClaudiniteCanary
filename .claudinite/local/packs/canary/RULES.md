# Canary rules

This repo is the **live canary** for Claudinite's consumer-safety gate. It is not a product. It
carries no application code and it is meant to be disposable.

The canon's `canary-rehearsal.yml` workflow converges this repo against a candidate canon ref and
asks one question: *does a real member still work?* Everything here exists to make that question
answerable.

## Standing rules

- **The canary's own rules stay trivial.** They prove the pack loaded; they do not enforce anything
  about this repo. A rule with real opinions would turn the canary red for reasons unrelated to the
  canon ref under test, which destroys the only signal this repo produces.
- **Divergence from `main` is expected and disposable.** A rehearsal may leave this repo converged
  against a candidate ref. Re-baselining it to canon `main` is always the right repair; there is no
  local state here worth preserving.
