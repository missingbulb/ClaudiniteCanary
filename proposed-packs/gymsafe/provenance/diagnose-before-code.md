## 2026-09-22 · born · converted from GymSafe's CLAUDE.md, lines 130-132 and 808
- **Source:** GymSafe CLAUDE.md, "Production Bug Investigation & Observability".
- **Reason:** a root cause proposed before the evidence layer survives it - the source names
  /diagnose as the *first* move, and says not to open the codebase first, because opening it first
  reliably skipped the evidence.
- **Mechanism:** prose, keyed to the symptom that sends a reader looking rather than to the act that
  caused it. No file edit predicts the moment somebody notices odd production behaviour.
- **Retire when:** Retire if /diagnose stops reading live Cloud Logging, or if the three tools under
  NFR-OBS are withdrawn.
