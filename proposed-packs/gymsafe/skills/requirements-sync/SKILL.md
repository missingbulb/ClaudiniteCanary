---
name: requirements-sync
description: How GymSafe's docs/requirements.md is kept in step with the code — which change lands in which section, when, and what to verify before calling a task done. Use when implementing a user story, adding an endpoint, a config parameter or an FR/NFR, or when a bug fix changes behaviour.
metadata:
  body: workflow
  force-load-on-file-edits-paths:
    - "docs/requirements.md"
---

# Keeping requirements in step

`docs/requirements.md` is the single source of truth for what the system does. It is updated
**during** implementation, and its commit lands with or before the code's — not after, and not
when somebody asks.

## What lands where

| The change | Where it goes |
| --- | --- |
| a user story implemented, even partly | its status: 🔲 Planned → ✅ Done, or `✅ Done (partial: X, Y pending)` |
| a new API endpoint | the FR section **and** API Specifications, §4.2 — request/response schemas, error codes, auth |
| a new business rule | the matching FR subsection |
| a new data model | §5 |
| a config parameter — threshold, timeout, cache TTL, default, tolerance | §6, with its value, rationale and units |
| a security, performance or UX change | NFR-SEC, NFR-PERF, NFR-USE |
| a bug fix revealing a missing requirement | add it; if the fix changes behaviour, update the existing one; if it adds logic, document the rule |
| an architecture decision | `hld.md`, not here |

Document **what** the system does, never how it is implemented. Reference the requirement id back
from the code — `// Implements FR-PUSH-003` — and from the `fr` field of every `logDecision`,
which is the field that actually keeps the two from drifting.

## Before calling a task done

- [ ] user story status updated, if one applies
- [ ] functional requirements added or updated
- [ ] API specification written, if the change added an endpoint
- [ ] configuration parameters documented, if the change added any
- [ ] non-functional requirements added, for a security / performance / UX change
- [ ] `docs/requirements.md` committed and pushed
- [ ] mockups created and approved during planning, and the implementation matches them, for a UI change

## A worked example

1. "Add caching to routines endpoint"
2. Read requirements.md first — FR-ROUT-002 already mentions caching
3. Implement the 5-minute cache
4. Update FR-ROUT-002: "System shall cache routine list for 5 minutes in Firestore"
5. Add §6.11: "Routine list cache TTL: 5 minutes"
6. Commit requirements.md: `Document routine caching (FR-ROUT-002, section 6.11)`
7. Commit the code: `Implement 5-min cache for routines (FR-ROUT-002)`

Checking whether the requirement already exists is step 2 for a reason: implementing first and
documenting second is how a feature ends up with two requirements, or none.

## The drift check

When reviewing the document as a whole, four questions find everything that has slipped: features
marked Planned that are actually implemented, implemented features with no user story, endpoints
with no documentation, configuration values with no rationale.
