# ClaudiniteCanary

<!-- claudinite:packs -->
![basics](.claudinite/shared/packs/basics/badge.svg "basics") ![claudinite-lifecycle](.claudinite/shared/packs/claudinite-lifecycle/badge.svg "claudinite-lifecycle") ![barriers](.claudinite/shared/packs/barriers/badge.svg "barriers") ![git-github](.claudinite/shared/packs/git-github/badge.svg "git-github") ![claudinite-growth](.claudinite/shared/packs/claudinite-growth/badge.svg "claudinite-growth") ![tidy-repo](.claudinite/shared/packs/tidy-repo/badge.svg "tidy-repo") ![claude-code-web-users-support](.claudinite/shared/packs/claude-code-web-users-support/badge.svg "claude-code-web-users-support") ![canary-probe](.claudinite/shared/packs/canary-probe/badge.svg "canary-probe")<!-- /claudinite:packs -->

Testing repo for Claudinite release tests — the **live canary** for Claudinite's consumer-safety
gate.

Canon CI can show that a Claudinite change is internally consistent. It cannot show the change is
safe for **consumers**: the vendored mount, the pack loader, the hook wiring and the skill mounts
only meet a real repo on the far side of a vendor set. So the canon's `canary-rehearsal.yml`
converges this repo against a candidate ref and asks whether a real member still works.

That makes this repo a deliberate paradox: it must be **real** (a stub proves nothing about
consumers) and **disposable** (nobody would let a rehearsal converge a repo that mattered). It
therefore carries the full member shape and nothing else — no product code:

| Piece | Why it is here |
| --- | --- |
| the vendored mount | the canon snapshot this repo runs from, stamped in the declaration |
| `.claudinite-checks.json` | the pack declaration, the stamp, and the scheduler settings |
| `.claude/settings.json` | the SessionStart / Stop / PreToolUse / SessionEnd hook wiring |
| `.github/workflows/claudinite-scheduler.yml` | the repo's only cron, on its repo-hashed minute |
| `.github/workflows/claudinite-conformance.yml` | the unfiltered world sweep every PR is gated on |
| the `canary` local pack | the shape that broke the fleet in canon #555 |

(Paths under the mount are named in prose rather than linked, because the `claudinite-isolation`
rule bars consumer files from coupling to the vendored canon — and this repo is the last place
that rule should be waived.)

The local pack is the highest-value piece. Its rules are deliberately trivial and deliberately
non-firing: they exist to prove the pack **loaded** — manifest parsed, both rule scopes dispatched,
bundled skill mounted — not to enforce anything about this repo.

Before changing anything here, read the pack's own `canary-role` skill (mounted into every session
here, alongside its `RULES.md`). The short version: a red rehearsal is a claim about the
**candidate canon ref**, not about this repo. Fix it in the canon. A canary patched to stay green
has stopped reporting.
