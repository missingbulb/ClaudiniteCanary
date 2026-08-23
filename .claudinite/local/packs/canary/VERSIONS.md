# Version history

Records for `.claudinite/local/packs/canary/` — a local pack (`local/canary`), never versioned or
distributed, so this file carries no `version` column. It is the record automatic work makes when
it changes this pack, per `claudinite-growth`'s rule: a row per change, in the same commit as the
change, written by the growth task that made it.

| Date | Task | What changed |
|---|---|---|
| 2026-08-23 | rule-revalidation | The pack's declaration-file name, referenced in `RULES.md`, `pack.mjs`, `pack-intact.mjs`'s check text, and `skills/canary-role/SKILL.md`, was corrected from the legacy `.claudinite-checks.json` to the current `.claudinite-settings.json`, per the engine's rename record (#1252, `.claudinite/shared/engine/settings-file.mjs`). |
