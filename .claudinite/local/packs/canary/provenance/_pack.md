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

## 2026-09-29 · reworded · the manifest is pack.json and states only what the folder cannot
- **Reason:** the id, prose file, rule lists and skill list repeated the directory, and detect and
  marker were retired fields nothing read.
- **Actor:** @missingbulb (owner).
- **Model:** claude-opus-5-5
