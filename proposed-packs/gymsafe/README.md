# gymsafe

GymSafe's own conventions: the observability contract its `/diagnose` loop rests on, the
requirements document that is its source of truth, the shape a plan must have before approval,
the audit a deploy must carry, and the points at which a domain expert is consulted.

A local pack — declare it as `local/gymsafe` in `.claudinite-settings.json`. It activates
nowhere else, and it holds nothing about how any individual likes to be worked with.

## Rules

Eight, in [RULES.md](RULES.md), grouped as Observability, Shipping and Planning. Each is a
judgement made in flight that no script can make: whether a branch shapes what a user sees,
whether a log would answer the question somebody is about to ask, whether a change is
domain-critical.

## Checks

| Check | Severity | Demands | Satisfied by |
| --- | --- | --- | --- |
| `gymsafe/decision-log-fr-known` | blocking | every `fr:` a `logDecision` names is defined in `docs/requirements.md` | using the canonical id, or adding the requirement |
| `gymsafe/decision-log-substantive` | advisory | no empty `inputs`/`outcome`, no branch name that fits every branch | filling both objects, and naming the rule that fired |
| `gymsafe/route-ownership` | advisory | a handler addressing one resource by id reads `userId` | comparing the resource's `userId` to the caller's before acting |
| `gymsafe/requirements-synced` | advisory | a branch touching `backend/src` or `frontend/src` also touches `docs/requirements.md` | updating the document in the same change, or saying in the PR why none moved |

The first three scan the repository; the last judges the branch in front of the session at the
Stop hook. All four scan the project's own TypeScript only, tests excluded.

## Skills

| Skill | Reach for it |
| --- | --- |
| [pre-deploy-checklist](skills/pre-deploy-checklist/SKILL.md) | before any `gcloud run deploy` or `firebase deploy` |
| [instrumenting-decisions](skills/instrumenting-decisions/SKILL.md) | writing a runtime branch, a `logDecision`, or tracing with `/diagnose` |
| [requirements-sync](skills/requirements-sync/SKILL.md) | editing `docs/requirements.md` |
| [mockup-driven-ui](skills/mockup-driven-ui/SKILL.md) | planning or building user-facing UI |
| [running-the-test-suites](skills/running-the-test-suites/SKILL.md) | running or writing backend, frontend or E2E tests |
| [sme-consultation](skills/sme-consultation/SKILL.md) | anything touching injuries, exercise data or progression rules |

`instrumenting-decisions`, `requirements-sync` and `running-the-test-suites` load themselves on
the file edits that need them; the other three are reached for by name, or by the rule that names
them.
