import { describe, expect, it } from "vitest";
import { evaluateNewStageState, type NewStageGitState } from "./check-new-stage";

const ready: NewStageGitState = {
  branch: "main",
  clean: true,
  remoteUrl: "git@github.com:pengcc/holiday-sync-germany.git",
  upstream: "origin/main",
  head: "abc123",
  originMain: "abc123",
};

describe("new-stage Git gate", () => {
  it("accepts clean synchronized main", () => {
    expect(evaluateNewStageState(ready)).toEqual([]);
  });

  it("rejects a feature branch even when its commit matches main", () => {
    expect(evaluateNewStageState({ ...ready, branch: "codex/next-stage" })[0]).toContain(
      "must start from refreshed main",
    );
  });

  it("reports dirty, remote, upstream, and synchronization failures", () => {
    const errors = evaluateNewStageState({
      ...ready,
      clean: false,
      remoteUrl: "git@github.com:example/wrong.git",
      upstream: "",
      head: "local",
      originMain: "remote",
    });
    expect(errors).toHaveLength(4);
    expect(errors.join("\n")).toContain("working tree is dirty");
    expect(errors.join("\n")).toContain("expected git@github.com:pengcc/holiday-sync-germany.git");
    expect(errors.join("\n")).toContain("expected origin/main");
    expect(errors.join("\n")).toContain("not identical to origin/main");
  });
});
