import { describe, it, expect } from "vitest";
import { detectOverspend } from "../../server/audit-engine/rules/overspendDetector";
import { findCurrentPlan } from "../../server/audit-engine/engine";
import { AuditInput } from "@/server/audit-engine";

describe("detectOverspend for non api", () => {
  it("returns empty array when user is on correct plan", () => {
    const input: AuditInput = {
      toolName: "Copilot",
      planName: "Pro",
      currentSpend: 10,
      usageLevel: "medium",
      teamSize: 5,
      primaryUseCase: "coding",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result).toEqual([]); 
  });

  it("returns overspend issue for low usage expensive plan", () => {
    const input: AuditInput = {
      toolName: "Copilot",
      planName: "Pro",
      currentSpend: 25,
      usageLevel: "low",
      teamSize: 1,
      primaryUseCase: "coding",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result.length).toBeGreaterThan(0);
  });
 it("returns not overspend because teamsize >1", () => {
    const input: AuditInput = {
      toolName: "Copilot",
      planName: "Pro",
      currentSpend: 20,
      usageLevel: "low",
      teamSize: 2,
      primaryUseCase: "coding",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result).toEqual([]); 
  })
  it("returns overspend issue for high usage expensive plan", () => {
    const input: AuditInput = {
      toolName: "Copilot",
      planName: "Pro",
      currentSpend: 25,
      usageLevel: "high",
      teamSize: 1,
      primaryUseCase: "coding",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result.length).toBeGreaterThan(0);
  });
  it("returns exact spend for low usage expensive plan", () => {
    const input: AuditInput = {
      toolName: "cursor",
      planName: "Pro+",
      currentSpend: 60,
      usageLevel: "low",
      teamSize: 1,
      primaryUseCase: "coding",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result.length).toBeGreaterThan(0);
  });
});

describe("detectOverspend for api", () => {
  it("returns empty array when user is on correct plan", () => {
    const input: AuditInput = {
      toolName: "Claude API",
      planName: "Opus 4.7",
      usageLevel: "medium",
      teamSize: 5,
      InputPrice: 5,
      OutputPrice: 25,
      primaryUseCase: "api",
    };

    const result = detectOverspend(input, findCurrentPlan(input));
    console.log(result)

    expect(result).toEqual([]);
  });

  it("returns overspend issue for low usage expensive plan", () => {
    const input: AuditInput = {
      toolName: "Claude API",
      planName: "Opus 4.7",
      usageLevel: "low",
      teamSize: 5,
      InputPrice: 10,
      OutputPrice: 30,
      primaryUseCase: "api",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result.length).toBeGreaterThan(0);
  });

  it("returns overspend issue for high usage expensive plan", () => {
    const input: AuditInput = {
      toolName: "Claude API",
      planName: "Opus 4.7",
      usageLevel: "medium",
      teamSize: 5,
      InputPrice: 10,
      OutputPrice: 30,
      primaryUseCase: "api",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result.length).toBeGreaterThan(0);
  });
  it("returns exact spend for low usage expensive plan", () => {
    const input: AuditInput = {
      toolName: "Claude API",
      planName: "Opus 4.7",
      usageLevel: "low",
      teamSize: 5,
      InputPrice: 5,
      OutputPrice: 25,
      primaryUseCase: "api",
    };

    const result = detectOverspend(input, findCurrentPlan(input));

    expect(result.length).toBeGreaterThan(0);
  });
});
