## 2026-09-22 · born · converted from GymSafe's CLAUDE.md, lines 180 and 292
- **Source:** GymSafe CLAUDE.md, the MANDATORY pre-deploy checklist and its closing paragraph.
- **Reason:** the trigger had been scoped to specific backend paths, so a UI-only patch (the
  2026-04-20 volume-trend follow-up) shipped with zero tests without the audit ever firing. The
  visible tick is a forcing function against tunnel vision, not a record - which is why the rule is
  about the checklist appearing, not about it existing.
- **Mechanism:** prose pointing at the pre-deploy-checklist skill. A deploy is not a file edit, so
  no force-load trigger reaches it and the rule cannot move into the skill it names; the skill
  carries the ten items, the rule carries only the obligation.
