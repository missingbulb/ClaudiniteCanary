---
name: sme-consultation
description: When GymSafe's fitness-trainer-sme must be consulted, at which four points, and what the code then has to carry to show it happened. Use when planning or implementing anything touching injuries, biomechanics, exercise data, rep ranges, RPE, load progression or substitutions.
metadata:
  body: workflow
---

# Consulting the domain expert

`fitness-trainer-sme` (`.claude/agents/fitness-trainer-sme.md`) owns hypertrophy training and
exercise science. Consult it **before** planning, not after — a plan built on a wrong domain
assumption is re-planned, not patched.

## Does this need the SME

Any yes:

- [ ] user safety — injuries, biomechanics, pain, load progression
- [ ] domain expertise — exercise science, training principles, movement patterns
- [ ] seed data or defaults — exercise databases, rep ranges, substitution rules
- [ ] progression logic — RPE thresholds, increment rules, injury handling

Keyword triggers: injury, biomechanics, exercise defaults, rep ranges, progression rules, RPE,
substitutions, movement patterns, body areas, contraindications.

## The four checkpoints

1. **Requirements** — before the plan exists, to define the requirement and its safety constraints
2. **Data validation** — the data models and defaults, before they are seeded
3. **Implementation review** — the built behaviour, for safety compliance
4. **Test scenarios** — SME-provided cases, which go into the test suite as they are given

Schedule 2–4 in the plan itself. A consultation nobody scheduled is a consultation that does not
happen: the US-110 substitution database shipped 56 entries where the SME's audit found 144, a
157% gap, because only the first checkpoint was taken.

## What the code carries afterwards

Document the consultation in a comment at the data or logic it validated, with date and scope,
naming which SME rules the code implements. `verifiedBySME` is true only where the SME actually
reviewed that data.

```typescript
/**
 * Exercise substitution seed data for US-110
 *
 * SME Consultation History:
 * - 2026-02-02: Comprehensive audit by fitness-trainer-sme (agent ID: a347cc7)
 * - Coverage: 144 substitutions across 36 exercises, 8 injury types
 * - Validation: Biomechanical tiers, load transfer ratios (0.45-1.0), safety rules S-1 to S-5
 * - Test scenarios: substitution-engine.service.test.ts lines 174-243 (SME-provided)
 */
```
