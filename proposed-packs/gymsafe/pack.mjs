import decisionLogFrKnown from './worldRules/decision-log-fr-known.mjs';
import decisionLogSubstantive from './worldRules/decision-log-substantive.mjs';
import routeOwnership from './worldRules/route-ownership.mjs';
import requirementsSynced from './workRules/requirements-synced.mjs';

// The `gymsafe` pack: that project's own conventions, converted out of its CLAUDE.md.
//
// A local pack, so it is declared by hand as `local/gymsafe` in .claudinite-settings.json
// and detect/marker stay null — nothing here is fingerprinted or seeded.
//
// The routing below is the line the conversion drew: a rule that survives swapping the
// PERSON but not the REPO is this pack's; one that survives swapping the repo is its
// author's own, and lives in the pack that travels with them.
export default {
  id: 'gymsafe',
  ruleRoutingGuidance: {
    belongs:
      "GymSafe's own conventions — its observability contract, its requirements document, its "
      + 'plan shape, its deploy gate and its domain-expertise checkpoints',
    excludes:
      'how any one person likes to be worked with (their own pack carries that), portable '
      + 'engineering practice (the canon packs do), and what the product does (docs/requirements.md does)',
  },
  detect: null,
  marker: null,
  prose: 'RULES.md',
  worldRules: [decisionLogFrKnown, decisionLogSubstantive, routeOwnership],
  workRules: [requirementsSynced],
  skills: [
    'pre-deploy-checklist',
    'instrumenting-decisions',
    'requirements-sync',
    'mockup-driven-ui',
    'running-the-test-suites',
    'sme-consultation',
  ],
};
