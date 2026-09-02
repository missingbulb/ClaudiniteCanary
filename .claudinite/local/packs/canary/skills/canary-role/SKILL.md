---
name: canary-role
description: What ClaudiniteCanary is for and how to work in it — the live canary for Claudinite's consumer-safety gate. Use before changing anything in this repo, and when a canary rehearsal comes back red and you have to decide what the red means.
---

# Working in the canary

This repo is Claudinite's **live canary**. Read this before changing anything here, because the
normal instinct — make the repo green, make the repo useful — is wrong in a specific way.

## The gate this repo is half of

Canon CI can prove a canon change is internally consistent. It cannot prove the change is safe for
**consumers**: the vendored mount, the pack loader, the hook wiring and the skill mounts only meet
a real repo on the other side of a vendor set. So the canon runs
`.github/workflows/canary-rehearsal.yml`, which converges *this* repo against a candidate canon ref
and runs the world sweep and the selftest against the result.

The gate's whole value rests on this repo being a **real, disposable member**. Real, or the
rehearsal tests a shape no consumer has. Disposable, or nobody will let the rehearsal converge it.

## What must not be removed

Anything that makes this a member is load-bearing:

- the vendored mount at `.claudinite/shared/` and the `.claudinite-checks.json` declaration
  that names what is vendored;
- the `.claude/settings.json` hook registrations;
- the vendored scheduler workflow, with the repo-hashed cron minute;
- the unfiltered conformance workflow;
- **the `local/canary` pack** — the highest-value shape here. (1)

## Reading a red rehearsal

A rehearsal failure is a claim about the **candidate canon ref**, not about this repo. Before
touching anything here, separate the two:

1. **Does the same failure reproduce against canon `main`?** If it does, the canary drifted or
   broke on its own and the candidate ref is exonerated. Re-baseline to `main` and re-run.
2. **Only the candidate ref fails?** That is the signal the gate exists to produce. Fix it in the
   canon. Do not fix it here — a canary patched to stay green is a canary that has stopped
   reporting.
3. **Never quiet a finding with an `accept` entry to get a rehearsal green.** An `accept` is a
   reasoned keep about *this repo's* content; using one to mask a canon regression converts a
   loud failure into a silent one, permanently.

## Repairing the canary

Re-baselining to canon `main` is always the correct repair, and there is no local state here worth
preserving. One caveat, from vendoring's anti-rewind guard: the stamped `ref` in
`.claudinite-checks.json` must be an **ancestor of canon `main`**. Stamp a feature-branch sha and
the repo lands `ref-not-on-trunk`, which convergence then refuses to rewind past — wedging the
repo permanently. Rehearsals may stamp a candidate ref by design; a human repair should not. (2)
