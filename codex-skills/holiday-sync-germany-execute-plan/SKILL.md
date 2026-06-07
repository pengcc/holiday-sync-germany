# Holiday Sync Germany Execute Plan

Use this skill when executing an approved or saved plan.

## Steps

1. Locate and read the saved plan in `dev_locals/plans/`.
2. Verify it matches the latest user-approved plan, including revisions made after the initial
   proposal.
3. If the plan is missing or stale, stop execution, save the correct plan, and restart this
   checklist.
4. Before creating a new stage branch, fetch and fast-forward `main`, then run
   `mise exec -- corepack pnpm workflow:check-new-stage`. Stop if it fails.
5. Create the plan branch only after the gate passes. A local commit or pushed branch is not proof
   that the previous stage was merged.
6. Re-check Git status and branch base before editing.
7. Keep edits scoped to the plan.
8. Avoid product scope creep, especially backend runtime, personal data, telemetry, or paid
   services.
9. Run relevant checks.
10. Self-review changed files before finishing.
11. Make a checkpoint commit after a coherent work unit if checks pass and Git is available.

## Reporting

Report changed files, checks run, checks skipped, and any follow-up risks.
