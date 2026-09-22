## 2026-09-22 · born · converted from GymSafe's CLAUDE.md, lines 301-302
- **Source:** GymSafe CLAUDE.md, "Lesson learned (2026-04-11)".
- **Reason:** engine.ts and RULE_REFERENCES logged FR-PROG-015 "Rep completion gate" where the
  canonical id is FR-PROG-016 (015 is "Inferred conservative"). The drift was invisible until the
  traceability script existed, and it unjoins /diagnose and /verify from the requirement while
  looking fully instrumented.
- **Mechanism:** a coded world rule, blocking - a hand-typed id checked against docs/requirements.md
  is the comparison a script does perfectly and a reviewer does not. It scans the file rather than
  the diff, since an id also goes stale from the other side, when a requirement is renumbered under
  code that still logs it.
- **Retire when:** Retire if the FR-ID stops being hand-written into logDecision calls.
