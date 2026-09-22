# CLAUDE.md — GymSafe

GymSafe is a hypertrophy training copilot: it syncs workouts from Hevy, tracks injuries, and
generates load and volume recommendations.

| Layer | Technology |
| --- | --- |
| Backend | TypeScript, Node.js, Cloud Run |
| Frontend | React, Vite, Tailwind CSS, Firebase Hosting |
| Auth | Firebase Authentication |
| Database | Firestore |
| External API | Hevy (workout sync) |

## Where things are written down

- **What the system does** — `docs/requirements.md`: user stories and
  acceptance criteria, functional requirements (FR-*), non-functional requirements (NFR-*),
  configuration parameters, API specifications, data models, domain defaults. It is the single
  source of truth, and nothing about the product is duplicated into this file.
- **Why it is built that way** — `hld.md`, for architecture decisions.
- **How work is done here** — the `gymsafe` pack, under `.claudinite/local/packs/gymsafe/`. Its
  rules load in every session; its skills load when the work they cover is under way. Do not
  restate them here: the pack system injects the pack's rules at session start, so a copy in this
  file loads them twice and then drifts.
- **Domain knowledge** — `sme-defaults.md`, and `.claude/agents/fitness-trainer-sme.md` for the
  expert that owns it.

## Commands

`/diagnose <FR-ID-or-symptom>` traces a requirement from `docs/requirements.md` through the code
to live Cloud Logging. `/verify <FR-ID>` audits whether a deployed requirement is implemented,
tested and firing in production. `/playwright` drives a real browser. `/reflect` captures what a
session learned.
