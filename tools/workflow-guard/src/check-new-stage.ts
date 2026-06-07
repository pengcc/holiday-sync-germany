#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const expectedRemote = "git@github.com:pengcc/holiday-sync-germany.git";

export interface NewStageGitState {
  branch: string;
  clean: boolean;
  remoteUrl: string;
  upstream: string;
  head: string;
  originMain: string;
}

export function evaluateNewStageState(state: NewStageGitState): string[] {
  const errors: string[] = [];
  if (state.branch !== "main") {
    errors.push(
      `Current branch is ${state.branch}; new stages must start from refreshed main, not a feature branch.`,
    );
  }
  if (!state.clean) {
    errors.push("The working tree is dirty; commit, stash, or resolve changes before a new stage.");
  }
  if (state.remoteUrl !== expectedRemote) {
    errors.push(`origin is ${state.remoteUrl}; expected ${expectedRemote}.`);
  }
  if (state.branch === "main") {
    if (state.upstream !== "origin/main") {
      errors.push(`main tracks ${state.upstream || "nothing"}; expected origin/main.`);
    }
    if (state.head !== state.originMain) {
      errors.push(
        "Local main is not identical to origin/main. Fetch origin/main and fast-forward before continuing.",
      );
    }
  }
  return errors;
}

export function readNewStageState(cwd = process.cwd()): NewStageGitState {
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  const gitOptional = (...args: string[]) => {
    try {
      return git(...args);
    } catch {
      return "";
    }
  };
  return {
    branch: git("branch", "--show-current"),
    clean: git("status", "--porcelain") === "",
    remoteUrl: git("remote", "get-url", "origin"),
    upstream: gitOptional("rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"),
    head: git("rev-parse", "HEAD"),
    originMain: git("rev-parse", "origin/main"),
  };
}

export function checkNewStage(cwd = process.cwd()): void {
  const state = readNewStageState(cwd);
  const errors = evaluateNewStageState(state);
  if (errors.length > 0) {
    throw new Error(
      ["New-stage Git gate failed:", ...errors.map((error) => `- ${error}`)].join("\n"),
    );
  }
  console.log(`New-stage Git gate passed at ${state.head.slice(0, 12)} on synchronized main.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    checkNewStage();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
