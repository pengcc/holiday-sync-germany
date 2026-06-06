# Holiday Sync Germany Plan With Context

Use this skill when planning any Holiday Sync Germany task.

## Steps

1. Read `codex-skills/holiday-sync-germany-project-guideline/SKILL.md`.
2. Inspect the current repository state and branch.
3. Read the references relevant to the task.
4. Finalize the decision-complete plan with the user.
5. On leaving Plan Mode, save the complete latest plan under `dev_locals/plans/` as the first
   repository mutation.
6. Verify the saved file exists and reflects all revisions before branch creation or execution.
7. Include scope, non-goals, implementation sequence, checks, and cost/privacy/data assumptions.

## Plan Requirements

Every task gets a saved plan. Small tasks can use a short plan, but it still needs enough context
for another session to understand what was intended.

A plan shown only in chat is not saved. Do not start implementation, create the implementation
branch, refresh data, or perform external write actions until the plan file is present.

If planning is interrupted before persistence, reconstruct the latest plan, resolve any uncertain
revisions with the user, and save it before continuing.
