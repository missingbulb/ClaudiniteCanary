# Version history

Records for `.claudinite/local/packs/canary/`. This local pack carries no `version` field — a
row here marks a correction the `rule-revalidation` task made, not a manifest bump.

| Date | Source | What changed |
|---|---|---|
| 2026-08-23 | rule-revalidation | Every reference to the member declaration filename updated from the retired `.claudinite-checks.json` to `.claudinite-settings.json` (RULES.md, pack.mjs, pack-intact.mjs's finding/fix text, canary-role/SKILL.md) — the engine renamed the file (#1252, landed 2026-08-23) and this repo already carries only the new name. |
| 2026-08-23 | rule-revalidation | `mount-present.mjs`'s fix text stopped recommending `apply-vendor-set.mjs` to rebuild a missing mount — `adopt-claudinite/SKILL.md` documents that running it against an already-stamped repo silently skips migration records. Points instead at forcing the repo's own update task via `workflow_dispatch`. |
