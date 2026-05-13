# Automated Tests

## Test Runner
All tests are run using Vitest. To run all tests:
```bash
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

## Test Files

### `src/tests/audit-engine/overspendDetector.test.ts`
**What it covers:** Tests the `detectOverspend` function for detecting overspending on AI tools. Includes tests for:
- Non-API tools (e.g., Copilot, Cursor) with different usage levels and team sizes
- API tools (e.g., Claude API) with input/output pricing
- Correct plan detection vs. overspend scenarios

**How to run:** `npm test src/tests/audit-engine/overspendDetector.test.ts`

### `src/tests/audit-engine/runAudit.test.ts`
**What it covers:** Tests the `runAudit` function which orchestrates the audit process. Includes tests for:
- Selecting the best recommendation with highest savings from multiple rules
- Calculating monthly and annual savings
- Handling API-specific savings (input/output)
- Generating insight messages with suggested plans

**How to run:** `npm test src/tests/audit-engine/runAudit.test.ts`

### `src/tests/audit-engine/teamSizeOptimisePlan.test.ts`
**What it covers:** Tests the `detectTeamsSizeOverSpending` function for optimizing plans based on team size. Includes tests for:
- Correct plan selection for team size
- Detecting when a team is on the wrong plan for their size

**How to run:** `npm test src/tests/audit-engine/teamSizeOptimisePlan.test.ts`