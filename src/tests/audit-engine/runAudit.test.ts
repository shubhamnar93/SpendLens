import { describe, it, expect, vi, beforeEach } from "vitest";
import { runAudit } from "../../server/audit-engine/engine";
import * as overspendRule from "../../server/audit-engine/rules/overspendDetector";
import * as teamRule from "../../server/audit-engine/rules/teamSizeOptimisePlan";
import type { AuditInput, AuditRecommendation } from "@/server/audit-engine";

function mockRecommendation(overrides: Partial<AuditRecommendation>): AuditRecommendation {
  return {
    toolName: "MockTool",
    planName: "MockPlan",
    action: "MockAction",
    reason: "MockReason",
    newSpend: 0,
    category: "coding",
    usageBudget: "MockBudget",
    ...overrides,
  };
}

describe("runAudit()", () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("picks recommendation with highest savings from all rules", () => {
    vi.spyOn(overspendRule, "detectOverspend").mockReturnValue([
      mockRecommendation({ planName: "Starter", savings: 5 })
    ]);

    vi.spyOn(teamRule, "detectTeamsSizeOverSpending").mockReturnValue([
      mockRecommendation({ planName: "Team", savings: 20 })
    ]);

    const input: AuditInput = {
      toolName: "Copilot",
      planName: "Pro",
      primaryUseCase: "coding",
      currentSpend: 30,
      teamSize: 5,
      usageLevel: "medium",
    };

    const result = runAudit(input);

    expect(result.recommendations[0].planName).toBe("Team");
  });

  it("calculates monthly and annual savings correctly", () => {
    vi.spyOn(overspendRule, "detectOverspend").mockReturnValue([
      mockRecommendation({ planName: "Starter", savings: 10 })
    ]);

    vi.spyOn(teamRule, "detectTeamsSizeOverSpending").mockReturnValue([]);

    const input: AuditInput = {
      toolName: "Copilot",
      planName: "Pro",
      primaryUseCase: "coding",
      currentSpend: 30,
      teamSize: 5,
      usageLevel: "medium",
    };

    const result = runAudit(input);

    expect(result.totalMonthlySavings).toBe(10);
    expect(result.totalAnnualSavings).toBe(120);
  });

  it("uses input/output savings when savings field is missing", () => {
    vi.spyOn(overspendRule, "detectOverspend").mockReturnValue([
      mockRecommendation({ planName: "API Saver", inputSavings: 2, outputSavings: 3 })
    ]);

    vi.spyOn(teamRule, "detectTeamsSizeOverSpending").mockReturnValue([]);

    const input: AuditInput = {
      toolName: "OpenAI",
      planName: "Pro",
      primaryUseCase: "api",
      currentSpend: 50,
      teamSize: 5,
      usageLevel: "medium",
    };

    const result = runAudit(input);

    expect(result.recommendations[0].planName).toBe("API Saver");
  });

  it("generates insight message containing suggested plan", () => {
    vi.spyOn(overspendRule, "detectOverspend").mockReturnValue([
      mockRecommendation({ planName: "Starter", savings: 15 })
    ]);

    vi.spyOn(teamRule, "detectTeamsSizeOverSpending").mockReturnValue([]);

    const input: AuditInput = {
      toolName: "Copilot",
      planName: "Pro",
      primaryUseCase: "coding",
      currentSpend: 30,
      teamSize: 5,
      usageLevel: "medium",
    };

    const result = runAudit(input);

    expect(result.insights[0]).toContain("Starter");
  });

});
