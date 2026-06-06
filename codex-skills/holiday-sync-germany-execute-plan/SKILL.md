# Holiday Sync Germany Execute Plan

Use this skill when executing an approved or saved plan.

## Steps

1. Locate and read the saved plan in `dev_locals/plans/`.
2. Verify it matches the latest user-approved plan, including revisions made after the initial
   proposal.
3. If the plan is missing or stale, stop execution, save the correct plan, and restart this
   checklist.
4. Re-check Git status and branch base before editing.
5. Keep edits scoped to the plan.
6. Avoid product scope creep, especially backend runtime, personal data, telemetry, or paid
   services.
7. Run relevant checks.
8. Self-review changed files before finishing.
9. Make a checkpoint commit after a coherent work unit if checks pass and Git is available.

## Reporting

Report changed files, checks run, checks skipped, and any follow-up risks.
