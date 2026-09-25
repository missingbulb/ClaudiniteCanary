## 2026-08-01 · born · Bootstrap Claudinite into the canary (#1)
- **Reason:** the rehearsal only proves something against a real member, so the full member shape
  was adopted rather than a stub.
- **Actor:** @missingbulb (owner).
- **Model:** Claude, per the commit trailer.
- **Mechanism:** a RULES.md rule, triggered on "Stay a realistic member.".
- **Landed:** #1.

## 2026-08-09 · converted · the hooks and workflow artifacts became a check (#42)
- **Source:** the weekly prose-to-checks sweep, #34.
- **Reason:** deletion test failed - the bullet also names the pack's declaration, which a check
  inside the pack cannot see go missing, so the prose stays.
- **Actor:** the prose-to-checks sweep run, merged by @missingbulb (owner).
- **Model:** Claude, per the commit author.
- **Mechanism:** partly, to the world-scope check `canary/realism-artifacts`, asserting
  `.claude/settings.json` and the scheduler and conformance workflows are present; the mount and
  pack files were already covered by `canary/mount-present` and `canary/pack-intact`.
- **Landed:** #42 (Refs #34).
