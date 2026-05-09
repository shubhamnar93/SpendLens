import { auditKnowledge } from "../knowledge/dataset";
import { AuditAPIPlan, AuditInput, AuditRecommendation, AuditToolPlan } from "../types";

export function detectTeamsSizeOverSpending(
  input: AuditInput,
  currentPlan: AuditToolPlan | AuditAPIPlan | null,
  // dataset: AuditToolPlan[],
): AuditRecommendation[] {

  if (!currentPlan || !("minTeamSize" in currentPlan) || !("currentSpend" in input) || input.currentSpend === undefined) {
    return [];
  }
  const getScore = (plan: AuditToolPlan | AuditAPIPlan) => {
    switch (currentPlan.category) {
      case "coding":
        return plan.codingScore;
      case "writing":
        return plan.writingScore;
      case "data":
        return plan.dataScore;
      case "research":
        return plan.researchScore;
      case "mixed":
      default:
        return plan.mixedScore;
    }
  };
  const recommendations: AuditRecommendation[] = [];
  if (input.teamSize < currentPlan.minTeamSize ) {
    // if (currentPlan.minTeamSize > 10) {}
    const l = auditKnowledge.filter((candidate) => {
      if (input.currentSpend !== undefined && (candidate.monthlyPrice * candidate.minTeamSize) < input.currentSpend && getScore(currentPlan) <= getScore(candidate)) {
        return true
      } else if (input.usageLevel == "low" && input.currentSpend !== undefined && (candidate.monthlyPrice * candidate.minTeamSize) < input.currentSpend && getScore(currentPlan) * 0.9 <= getScore(candidate)) {
        return true
      } else return false
    })
    recommendations.push(...l.map((plan) => ({
   toolName: plan.toolName,
    planName: plan.planName,
    action: "Consider not choosing team plan",
    reason: "Your current team size is below the minimum required for the selected plan.",
    currentSpend: input.currentSpend,
    newSpend: plan.monthlyPrice * plan.minTeamSize,
    savings: input.currentSpend ? (input.currentSpend - (plan.monthlyPrice * plan.minTeamSize)) : undefined,
    category: plan.category,
    usageBudget: plan.usageBudget,
  })))
}
  return recommendations;
}
