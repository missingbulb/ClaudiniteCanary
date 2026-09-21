## 2026-09-21 · born · converted from references.md (canary-role-1), dated by the conversion: "the local/canary pack"
- **Reason:** Canon #555 broke the fleet through exactly this surface: a local pack's manifest, its
  rules in both scopes, its bundled skills.
- **Mechanism:** a step of the canary-role skill, a workflow

## 2026-09-21 · strengthened · converted from references.md (canary-role-2), dated by the conversion
- **Reason:** Vendoring's anti-rewind guard (canon #328) refuses to rewind the stamped `ref` past a
  sha that isn't an ancestor of canon `main`; a human repair that stamps a feature-branch sha wedges
  the repo as `ref-not-on-trunk`.
- **Mechanism:** a step of the canary-role skill, a workflow
- **Retire when:** Retire only if convergence stops refusing a non-ancestor ref.

## 2026-09-21 · strengthened · converted from references.md (canary-role-3), dated by the conversion
- **Reason:** missingbulb/Claudinite#1547 pushed and removed two probe-workflow pairs directly on
  `main` (17fbd91/4eaae4d/4b5f504, f27f1fc/3b9c643, d3c4d5d/a2b5888) to verify a cross-repo
  reusable-workflow permission ceiling and a mount-hosted composite action against a real member,
  outside the rehearsal mechanism.
- **Mechanism:** a step of the canary-role skill, a workflow
- **Retire when:** Retire only if canon investigations stop using this repo for scratch,
  non-rehearsal probes.
