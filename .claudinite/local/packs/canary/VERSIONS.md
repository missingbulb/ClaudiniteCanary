# Version history

Records for `.claudinite/local/packs/canary`, one row per automated change a Claudinite growth task
makes to this pack — added going forward from the first automated change; nothing is backfilled.

| Date | Task | What changed |
|---|---|---|
| 2026-08-30 | prose-to-checks-sweep | Converted RULES.md's "Stay a realistic member" and "Keep the local pack loading" bullets to `canary/pack-declared` (`declared-checks.json`), which asserts `local/canary` is present in `.claudinite-settings.json`'s `packs` list. The rest of both bullets was already covered by `canary/mount-present`, `canary/realism-artifacts`, `canary/pack-intact` and `canary/pack-shape`, so both bullets are deleted whole. |
