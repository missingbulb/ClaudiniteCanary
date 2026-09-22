---
name: instrumenting-decisions
description: GymSafe's decision-logging contract (NFR-OBS-001) — what counts as a decision point, the logDecision schema, and the tools that read it back. Use when adding a runtime branch, when writing a logDecision call, or when tracing production behaviour with /diagnose or /verify.
metadata:
  body: guidelines
  force-load-on-file-edits-paths:
    - "backend/src/**/*.ts"
    - "frontend/src/**/*.ts"
    - "frontend/src/**/*.tsx"
---

# Instrumenting a decision

Every runtime decision-logic FR — `FR-PROG`, `FR-PROG-VOL`, `FR-PROG-I`, `FR-HOOK`, and any
future prefix that branches on data — emits a `logDecision` at its decision point. This is the
load-bearing rule of the whole observability loop: an uninstrumented branch is one `/diagnose`
cannot surface when it misfires.

## What is a decision point

- an `if` / `else if` / `switch` case branching on input data that returns or shapes the response
- a guard preventing an operation — an ownership check, a rep gate, an effort hard stop
- a rule selecting between alternatives — a confidence tier, a weight increment
- a safety net overriding a primary calculation — a volume floor cap, regression protection

Not a decision point: pure retrieval or storage (`logEvent` if wanted, not required), an internal
helper called from a decision point (the parent logs), a frontend rendering branch (`logEvent` on
the user action instead).

## The schema

```ts
logDecision({
  fr: 'FR-PROG-016',                    // canonical id from docs/requirements.md
  decision: 'rep_gate_blocked',          // stable branch name, snake_case
  entityId: input.exerciseName,
  entityType: 'exercise',
  inputs: {                              // the raw data driving the decision
    bestRepsAtTopWeight: 6,
    repRangeMin: 8,
    topWeight: 100,
    effectiveRPE: 7,
  },
  outcome: {                             // what happened, as the user would see it
    action: 'repeat',
    targetLoad: 100,
    targetReps: 8,
  },
}, 'optional human-readable msg')
```

`inputs` and `outcome` together must be rich enough that a future developer reading the log alone
can reproduce the branch (NFR-OBS-004). For a derived value, carry the raw inputs and the
intermediates, not only the result. Where sibling branches exist, carry which rule matched and the
priority order that broke the tie.

## The tools

```bash
scripts/prod-logs.sh --fr FR-PROG-VOL-002 --since 24h --pretty   # runtime query, ambient gcloud creds, run from repo root
npm run trace --prefix backend                                    # regenerates docs/traceability.{md,json}
scripts/check-traceability.sh                                     # exits non-zero below 50% decision-logic coverage
```

`check-traceability.sh` is advisory — there is no Actions pipeline. Run it before deploying, or
install it as a hook:

```bash
ln -s ../../scripts/check-traceability.sh .git/hooks/pre-push
```

`backend/src/utils/logger.ts` holds `logDecision` / `logEvent` / `logError`. Frontend events go
through the singleton sink in `frontend/src/lib/log-sink.ts` → `POST /api/v1/logs/ingest`, re-emitted
with `source: 'frontend'`. `/diagnose` and `/verify` read `docs/traceability.json`, so re-run the
trace whenever `docs/requirements.md` changes.

Add the `logDecision` in the same change as the FR. A deferred one is the gap that needed a whole
follow-up "instrumentation completion" deploy to close.
