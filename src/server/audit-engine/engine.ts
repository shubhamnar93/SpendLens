import type {
  AuditAPIPlan,
  AuditInput,
  AuditRecommendation,
  AuditResult,
  AuditToolPlan,
} from "./types";
import { apiKnowledge, auditKnowledge } from "./knowledge/dataset";
import { detectOverspend } from "./rules/overspendDetector";
import { detectTeamsSizeOverSpending } from "./rules/teamSizeOptimisePlan";

const normalize = (value: string) => value.trim().toLowerCase();

export function findCurrentPlan(
  input: AuditInput,
): AuditToolPlan | AuditAPIPlan | null {
  const normalizedToolName = normalize(input.toolName);
  const normalizedPlanName = normalize(input.planName);
  const normalizedCategory = normalize(input.primaryUseCase);
  if (normalizedCategory === "api") {
    return (
      apiKnowledge.find(
        (candidate) =>
          normalize(candidate.toolName) === normalizedToolName &&
          normalize(candidate.planName) === normalizedPlanName,
      ) || null
    );
  }
  return (
    auditKnowledge.find(
      (candidate) =>
        normalize(candidate.toolName) === normalizedToolName &&
        normalize(candidate.planName) === normalizedPlanName,
    ) || null
  );
}

// needs api caculation!!!
// function calculateBenchmark(
//   input: AuditInput,
//   currentPlan: AuditToolPlan | null,
// ): AuditResult['benchmark'] {
//   const spendPerDeveloper = input.teamSize
//     ? Number((input.currentSpend / input.teamSize).toFixed(2))
//     : null
//   //   const category = currentPlan?.category ?? input.primaryUseCase ?? 'mixed'
//   const categoryAverage = Number(averageCategoryPrice(currentPlan).toFixed(2))
//   const verdict = spendPerDeveloper === null
//     ? 'Benchmarking is limited because team size is not provided.'
//     : spendPerDeveloper > categoryAverage * 1.2
//       ? 'Your spend per developer is high for this category.'
//       : 'Your spend per developer is within a reasonable range for this category.'

//   return {
//     spendPerDeveloper,
//     categoryAverage,
//     verdict,
//   }
// }

export function runAudit(input: AuditInput): AuditResult {
  const currentPlan = findCurrentPlan(input);
  const getSavings = (r: AuditRecommendation) =>
    r.savings ?? (r.inputSavings ?? 0) + (r.outputSavings ?? 0);

  const recommendations: AuditRecommendation[] = [
    ...detectOverspend(input, currentPlan),
    ...detectTeamsSizeOverSpending(input, currentPlan),
  ].sort((a, b) => getSavings(b) - getSavings(a)); // S ort by savings descending
  const bestCheapestAI = recommendations[0] ?? null;
  return {
    toolName: input.toolName,
    planName: input.planName,
    currentSpend: input.currentSpend ? input.currentSpend : 0,
    InputPrice: input.InputPrice ? input.InputPrice : undefined,
    OutputPrice: input.OutputPrice,
    recommendations: [bestCheapestAI],
    totalMonthlySavings: bestCheapestAI.savings
      ? bestCheapestAI.savings
      : undefined,
    totalAnnualSavings: bestCheapestAI.savings
      ? bestCheapestAI.savings * 12
      : undefined,
    totalInputSavings: bestCheapestAI.inputSavings
      ? bestCheapestAI.inputSavings
      : undefined,
    totalOutputSavings: bestCheapestAI.outputSavings
      ? bestCheapestAI.outputSavings
      : undefined,
    insights: bestCheapestAI
      ? [
          `Your current plan may be overspending. Consider switching to ${bestCheapestAI.planName} 
           which could save you approximately $${input.primaryUseCase === "api" ? `${bestCheapestAI.inputSavings}$ on per million input token and ${bestCheapestAI.outputSavings}$ on per million output token` : `${getSavings(bestCheapestAI)}$ per month`} `,
        ]
      : [
          "Your current plan appears to be cost-effective based on our analysis.",
        ],
    // benchmark: calculateBenchmark(input, currentPlan),
  };
}
