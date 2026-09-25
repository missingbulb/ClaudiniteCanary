## 2026-08-01 · born · Bootstrap Claudinite into the canary (#1)
- **Reason:** a rule with real opinions would turn the canary red for reasons unrelated to the ref
  under test, destroying the only signal the repo produces.
- **Actor:** @missingbulb (owner).
- **Model:** Claude, per the commit trailer.
- **Mechanism:** a RULES.md rule, triggered on "The canary's own rules stay trivial.".
- **Landed:** #1.
