## 2026-08-01 · born · Bootstrap Claudinite into the canary (#1)
- **Source:** canon #555, which broke the fleet through a local pack's manifest parse, two-scope
  rule dispatch and skill mounting.
- **Reason:** the canary-rehearsal question - does a real member still work - is only worth asking
  if the canary carries a real local pack, so a canon change that stops loading local packs fails
  here before it reaches a member with real rules.
- **Actor:** @missingbulb (owner).
- **Model:** Claude, per the commit trailer.
- **Mechanism:** a local pack declared by hand as `local/canary`, never fingerprinted or seeded, so
  `detect` and `marker` stay null; its rules are deliberately trivial and non-firing, and its skill
  is mounted from inside the pack.
- **Landed:** #1.
