import { describe, it, expect } from "vitest";
import { detectTeamsSizeOverSpending } from "../../server/audit-engine/rules/teamSizeOptimisePlan";
import { findCurrentPlan } from "../../server/audit-engine/engine";
import { AuditInput } from "@/server/audit-engine";

describe("detectTeamsSizeOverSpending()", () => {
  it("returns empty array when user is on correct plan for team size", () => {
    const input: AuditInput = {
      toolName: "Claude",
      planName: "Team Standard (monthly)",
      primaryUseCase: "writing",
      currentSpend: 125,
      teamSize: 5,
      usageLevel: "low",
    };
    const result = detectTeamsSizeOverSpending(input, findCurrentPlan(input));
    expect(result).toEqual([]); 
  });
  it("returns array when user is on wrong plan for team size", () => {
    const input: AuditInput = {
      toolName: "Claude",
      planName: "Team Standard (monthly)",
      primaryUseCase: "writing",
      currentSpend: 125,
      teamSize: 2,
      usageLevel: "high",
    };
    const result = detectTeamsSizeOverSpending(input, findCurrentPlan(input));
    expect(result.length).toBeGreaterThan(0); 
  });
});
