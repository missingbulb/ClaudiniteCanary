# gymsafe — how this project is worked on

## Observability

- **Adding a branch that shapes what a user sees** — an `if`/`switch` on input data, a guard that
  blocks an operation, a rule choosing between alternatives, a safety net overriding a calculation
  — emit `logDecision` there with the FR-ID `docs/requirements.md` gives it, bug fixes included:
  an uninstrumented branch is invisible to `/diagnose` the day it misfires.
  (instrumenting-decision-branches)

- **Judging whether a decision log is good enough** — the bar is that a reviewer can answer a
  question about what they see on the page from the log alone, without reading code. A
  `logDecision` with empty `inputs`/`outcome` scores coverage while providing none, so it is worse
  than no log at all. (observability-semantic-bar)

- **Seeing odd behaviour in production** — run `/diagnose <FR-ID-or-symptom>` before opening the
  code: it reads the requirement, the implementing code and live Cloud Logging together, and a
  root cause proposed ahead of that evidence is a guess. (diagnose-before-code)

## Shipping

- **About to deploy** — backend or frontend, feature or formatting tweak — fill in
  [pre-deploy-checklist](skills/pre-deploy-checklist/SKILL.md) visibly in the response that
  announces the deploy. "Small change", "UI-only" and "just a formatting fix" are not exemptions;
  the checklist is the forcing function precisely for the change that feels too small to audit.
  (checklist-before-deploy)

- **Changing what the system does** — a new endpoint, a business rule, a config parameter, a
  behaviour a bug fix alters — update `docs/requirements.md` in the same change, saying what the
  system does rather than how, and land that commit with or before the code's.
  (requirements-in-same-change)

## Planning

- **Writing a plan** — it carries six sections: Context, Implementation, UI/UX Design, Tests,
  Requirements, Verification. A plan missing one is not ready for approval, and "no UI changes" or
  "no requirements needed" is stated explicitly rather than left out. (six-plan-sections)

- **Planning a change with any user-facing UI** — the HTML mockups exist and are approved before
  the plan is submitted, never promised inside it; no UI change is too simple to skip them, and
  once approved they are the spec the implementation matches exactly. (mockups-before-approval)

- **Planning anything touching injury, biomechanics, exercise defaults, rep ranges, RPE,
  progression rules, substitutions, body areas or contraindications** — consult
  `fitness-trainer-sme` before the plan rather than after, and again at data validation,
  implementation review and test scenarios. (sme-before-planning)
