---
name: mockup-driven-ui
description: GymSafe's mockup-first process for user-facing UI — who specifies what, when mockups are built and approved, and how the implementation is held to them. Use when planning or building any feature that adds or significantly changes UI components, pages or visual elements.
metadata:
  body: workflow
---

# Building UI from mockups

Required for any feature adding or significantly changing UI components, pages or visual
elements. Not required for backend-only changes, bug fixes with no visual impact, or
configuration changes.

## Who owns what

- **ux-researcher** (`voltagent-biz:ux-researcher`) — the user/behaviour spec: what information
  the page shows, what states exist, flow and interactions, content and copy, sample data that
  represents real usage, behaviour-driven accessibility needs.
- **ui-designer** (`voltagent-core-dev:ui-designer`) — the visual translation: colors, typography,
  spacing, component system, layout, interaction affordances, visual hierarchy, contrast and
  focus states.
- **frontend-developer** (`voltagent-core-dev:frontend-developer`) — the static HTML mockups and
  the React implementation.

Researcher and designer are invoked as a unit, never one alone, and **sequentially** — researcher
then designer. Run in parallel they produce competing specs; run alone, the researcher ends up
owning visual decisions too, which is how mockups satisfy the user need and drift visually.

## Planning phase, before any implementation code

1. ux-researcher defines the user/behaviour spec
2. ui-designer extends it with the visual spec
3. frontend-developer builds the static HTML mockups from the combined spec
4. ux-researcher reviews them for behaviour, content and flow fidelity
5. ui-designer reviews them for visual fidelity
6. frontend-developer iterates until both are satisfied
7. the user approves the mockups **alongside** the technical plan
8. the plan's UI/UX Design section references the approved files as the design spec

## Implementation phase

9. build the React components to match the approved mockups
10. ux-researcher compares the live implementation to the mockups — behaviour, content, flow
11. ui-designer compares it — colors, typography, spacing, component styling
12. frontend-developer fixes every difference
13. repeat 10–12 until the user confirms the match

## The mockup files

- `mockup-<feature-name>.html`, in the project root
- self-contained: inline CSS, no external dependencies, openable in a browser
- once approved they are the source of truth — do not deviate, and do not re-ask a design
  decision the mockup process already settled
- use the exact colors, fonts, spacing and structure from the mockup, not design-system
  approximations that look close
- where a shared component (FilterPills, Card) does not match the mockup's styling, inline the
  styling instead of using the component

That last point is what a charting library cost once: Recharts rendered nothing like the CSS-based
mockups, and all of it was replaced with pure CSS bars to get back to the approved design.
