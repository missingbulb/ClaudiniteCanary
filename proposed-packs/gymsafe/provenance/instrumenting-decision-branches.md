## 2026-09-22 · born · converted from GymSafe's CLAUDE.md, lines 129-178
- **Source:** GymSafe CLAUDE.md, "Production Bug Investigation & Observability" and "Decision-logic
  logging discipline (NFR-OBS-001)".
- **Reason:** the Face Pull incident (2026-04-11): three bug-fix tracks each introduced a new
  decision branch, none was instrumented at write time, and closing the gap cost a follow-up
  "instrumentation completion" deploy. The source spelled out that bug fixes are not exempt
  precisely because they had been read as exempt.
- **Mechanism:** prose - whether a branch shapes user-visible output is a judgement no scan makes.
  Its two scannable halves are checks: gymsafe/decision-log-fr-known and
  gymsafe/decision-log-substantive.
- **Retire when:** Retire if decision points stop being hand-written, or if /diagnose stops joining
  code to requirement through the logged FR-ID.
