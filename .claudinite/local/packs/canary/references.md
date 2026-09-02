# References — rationale behind this pack's rules and checks

Maintenance and review material for the `writing-pack-prose` references convention: each entry
carries the reason a rule or check exists, written so a periodic review can reaffirm — or
retire — it. Entry keys are file-scoped stable identifiers (gaps allowed, never renumbered): an
end-of-line `(n)` marker in `RULES.md` cites `RULES-n`, one in a skill cites
`<skill-name>-n`, and `check:` entries cover checks. No session loads this file for daily work.

- **(RULES-1)** Canon #555 broke the fleet through exactly this combination — a local pack's
  manifest parse, its rule dispatch in both scopes, and its skill mounting — so this pack exists
  to keep that combination loading for real. Retire only if the fleet stops depending on a local
  pack's manifest, two-scope rules and skill mount loading together.
- **(canary-role-1)** Canon #555 broke the fleet through exactly this surface: a local pack's
  manifest, its rules in both scopes, its bundled skills.
- **(canary-role-2)** Vendoring's anti-rewind guard (canon #328) refuses to rewind the stamped
  `ref` past a sha that isn't an ancestor of canon `main`; a human repair that stamps a
  feature-branch sha wedges the repo as `ref-not-on-trunk`. Retire only if convergence stops
  refusing a non-ancestor ref.
