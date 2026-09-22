## 2026-09-22 · born · converted from GymSafe's CLAUDE.md, lines 463-491 and 539-540
- **Source:** GymSafe CLAUDE.md, "Common Security Pitfalls" and the Code Review Checklist's security
  item.
- **Reason:** the injuries resolve and delete endpoints (found 2026-02-04) fetched by id, returned
  404 when absent, then acted - never comparing existing.userId to request.userId, so any
  authenticated caller could resolve anyone's injury. Every resource-scoped handler shares that
  shape, which is what makes the omission invisible by eye.
- **Mechanism:** a coded world rule, advisory - a mention of userId is not proof of a correct
  comparison and a handler may delegate the check, so the finding is "look here", not "this is
  broken". A blocking gate on a heuristic this coarse gets routed around rather than read.
