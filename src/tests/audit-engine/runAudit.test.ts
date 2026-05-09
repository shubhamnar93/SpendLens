import { describe, it, expect, vi, beforeEach } from "vitest";
import { runAudit } from "../../server/audit-engine/engine";
import * as overspendRule from "../../server/audit-engine/rules/overspendDetector";
import * as teamRule from "../../server/audit-engine/rules/teamSizeOptimisePlan";
import type { AuditInput } from "@/server/audit-engine";

describe("runAudit()", () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("picks recommendation with highest savings from all rules", () => {
    vi.spyOn(overspendRule, "detectOverspend").mockReturnValue([
      { planName: "Starter", savings: 5 }
    ] as any);

    vi.spyOn(teamRule, "detectTeamsSizeOverSpending").mockReturnValue([
      { planName: "Team", savings: 20 }
    ] as any);

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
      { planName: "Starter", savings: 10 }
    ] as any);

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
      { planName: "API Saver", inputSavings: 2, outputSavings: 3 }
    ] as any);

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
      { planName: "Starter", savings: 15 }
    ] as any);

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