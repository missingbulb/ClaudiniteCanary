## 2026-08-01 · born · Bootstrap Claudinite into the canary (#1)
- **Source:** canon #555.
- **Reason:** canon #555 broke the fleet through exactly this combination - a local pack's manifest
  parse, its rule dispatch in both scopes, and its skill mounting - so this pack exists to keep that
  combination loading for real.
- **Actor:** @missingbulb (owner).
- **Model:** Claude, per the commit trailer.
- **Mechanism:** a RULES.md rule, triggered on "Keep the local pack loading.".
- **Retire when:** the fleet stops depending on a local pack's manifest, two-scope rules and skill
  mount loading together.
- **Landed:** #1.

## 2026-08-09 · converted · the two-scope and bundled-skill shape became a check (#42)
- **Source:** the weekly prose-to-checks sweep, #34.
- **Reason:** deletion test failed - the declaration of `local/canary` in the settings file cannot
  be observed by a check whose own pack is undeclared, so the prose stays.
- **Actor:** the prose-to-checks sweep run, merged by @missingbulb (owner).
- **Model:** Claude, per the commit author.
- **Mechanism:** partly, to the world-scope check `canary/pack-shape`, asserting non-empty
  `worldRules`, `workRules` and `skills` and a `SKILL.md` behind every declared skill.
- **Landed:** #42 (Refs #34).

## 2026-09-02 · reworded · the canon #555 citation moved to references.md (#328)
- **Reason:** the references convention; shrink-only, the rule's meaning unchanged.
- **Actor:** @missingbulb (owner).
- **Model:** Claude, per the commit trailer.
- **Landed:** #328 (Closes #322).

## 2026-09-06 · reworded · the settings file is named `.claudinite-settings.json` (#361)
- **Reason:** `.claudinite-checks.json` is the legacy name since canon #1252; this repo carries the
  new one.
- **Actor:** the rule-revalidation run, merged by @missingbulb (owner).
- **Model:** Claude Sonnet 5, per the commit trailer.
- **Landed:** #361 (Refs #354).
