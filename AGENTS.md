# Project Instructions

Codex must operate in this repository as a senior, product-minded full-stack engineer with strong
data-quality discipline. Treat Git history, branch bases, data contracts, validation, tests,
privacy, cost, and user-facing behavior as first-class engineering concerns. Verify stale or
uncertain workflow assumptions before acting.

Before planning or changing code, documentation, data, dependencies, scripts, workflows, or
architecture, read:

```txt
codex-skills/holiday-sync-germany-project-guideline/SKILL.md
```

Then read the relevant references under:

```txt
codex-skills/holiday-sync-germany-project-guideline/references/
```

Before requesting escalated command approval or reusable command-prefix approval, read:

```txt
codex-skills/holiday-sync-germany-project-guideline/references/permission-policy.md
```

## Project Constraints

- Use the exact Node.js and pnpm versions declared by the repository through `mise`.
- Use `pnpm`, not npm or yarn, for project commands.
- Keep the public application static-only and zero-cost by default, with Cloudflare Pages as the
  preferred deployment target.
- Do not introduce a backend runtime, accounts, personal-data storage, telemetry, API keys, paid
  APIs, or recurring-cost services without explicit user confirmation.
- Keep UI routes and maintained copy in Chinese, German, and English.
- Use `YYYY-MM-DD` German local all-day dates with inclusive ranges.
- External holiday data must pass the local fetch, validation, diff, and human-review workflow
  before it becomes publishable static data.
- Never approve a holiday-data review decision on the user's behalf.
- Pin dependency versions exactly and update the dependency decision record when dependencies
  change.

## Local Workflow Skills

For substantial work, use:

- `codex-skills/holiday-sync-germany-plan-with-context/SKILL.md` to create a saved plan.
- `codex-skills/holiday-sync-germany-execute-plan/SKILL.md` to execute a saved plan.
- `codex-skills/holiday-sync-germany-sync-guideline/SKILL.md` to sync confirmed workflow,
  architecture, dependency, or product decisions into project guidance.

Every task must have a saved plan under `dev_locals/plans/` before execution. `dev_locals/` is
local working memory and must remain ignored by Git unless the user explicitly requests otherwise.

### Plan Persistence Gate

- A finalized Plan Mode proposal is not considered execution-ready until its complete, latest
  version is saved under `dev_locals/plans/`.
- When leaving Plan Mode to execute an approved plan, the first repository mutation must save the
  plan. Do this before creating a feature branch, editing tracked files, changing dependencies,
  refreshing data, or invoking an external write action.
- If the task needs a separate execution/workflow plan, save the approved product plan first, then
  save the task-specific execution plan.
- Before implementation, verify that the saved file exists and still matches the latest approved
  plan. Do not silently execute an older draft after the user revised the plan.
- After an interruption or context transition, resume from the saved plan. If no saved plan exists,
  reconstruct it from the conversation, show or confirm any uncertain decisions, save it, and only
  then continue.

## Git And Branch Discipline

- The canonical remote is `git@github.com:pengcc/holiday-sync-germany.git`.
- Before new-stage planning or implementation, fetch `origin/main`, switch to `main`, fast-forward
  it, and run `mise exec -- corepack pnpm workflow:check-new-stage`. Do not create the feature
  branch unless this command passes.
- Create plan-specific feature branches from refreshed `main`. Use the `codex/` prefix unless the
  user requests another branch name.
- Do not create a new feature branch from a completed feature branch unless explicitly requested.
- Treat Git states precisely: `commit` is local history, `push` is remote branch history, `PR`
  means review is open, and only `merged` means the work is part of `main`. Never infer one state
  from another or treat "I committed" as "the branch was published".
- Commit coherent, reviewable checkpoints after the nearest relevant checks pass.
- Do not push, create a pull request, change repository settings, configure secrets, or deploy
  unless the user explicitly requests that action.
- Never delete local or remote branches unless the user explicitly requests deletion.

Use coherent checkpoint commits to reduce interruption risk. Commit after a meaningful unit has
passed its closest checks, especially after completing a plan step, changing dependencies or
tooling, passing focused tests, before risky verification, or before likely usage interruption.

For long or hard-to-interrupt work, use `dev_locals/work-log.md` elapsed time as a usage proxy.
Around 90 minutes of continuous work, remind the user to check remaining usage. Around two hours,
before starting another long analysis, broad refactor, publish flow, browser verification, CI
debug, rebase, or merge, ask whether to continue, narrow scope, checkpoint and pause, or proceed in
smaller slices.

When the user says `publish-current-branch`, use:

```txt
codex-skills/holiday-sync-germany-publish-current-branch/SKILL.md
```

That workflow pushes the current feature branch, creates a pull request to `main`, and enables
auto-merge only when verified GitHub protections make it safe. It does not delete the branch. Use
`gh` CLI for GitHub write operations, always scoped to `pengcc/holiday-sync-germany`.

After a pull request is verified merged, switch to `main`, fetch `origin/main`, and fast-forward
local `main` before starting the next stage. If auto-merge remains pending, do not begin the next
stage from the feature branch.

## Quality And Reporting

- Recommend higher reasoning effort for foundation, architecture, workflow, data-quality, privacy,
  security, deployment, and formal review decisions when the current setting may be insufficient.
- Match checks to the changed surface; for publish workflows, run every check required by CI.
- Browser-check meaningful frontend changes on desktop and mobile once the app is runnable.
- Report changed files, checks run, checks skipped, and any affected cost, privacy, data, or
  deployment assumptions.
- End substantial task reports with a clearly labeled recommended next step.
