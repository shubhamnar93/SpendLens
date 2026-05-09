import { apiKnowledge, auditKnowledge } from "../knowledge/dataset";
import type {
  AuditAPIPlan,
  AuditInput,
  AuditRecommendation,
  AuditToolPlan,
} from "../types";

// give wheter the user is overspending based on their current plan price,
// and recommend downgrades if they are on a higher tier than needed for their usage level
export function detectOverspend(
  input: AuditInput,
  currentPlan: AuditToolPlan | AuditAPIPlan | null,
): AuditRecommendation[] {
  if (!currentPlan) {
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
  if ("monthlyPrice" in currentPlan && input.currentSpend !== undefined) {
    const price = currentPlan?.monthlyPrice;
    const threshold = price * 1.1; // 10% over the listed price is a common threshold for overspend

    if (input.currentSpend/input.teamSize > threshold) {
      recommendations.push({
        toolName: currentPlan.toolName,
        planName: currentPlan.planName,
        action: "Review overages and usage patterns",
        reason:
          "Your reported monthly spend exceeds the standard plan price, which often means overages or an unnecessarily large subscription tier.",
        currentSpend: input.currentSpend,
        newSpend: price,
        savings: (input.currentSpend/input.teamSize - price)* input.teamSize,
        category: currentPlan.category,
        usageBudget: currentPlan.usageBudget,
      });
    }

    if (input.usageLevel === "low") {
      // Get the appropriate score field based on the category
      const downgrade = auditKnowledge
        .filter(
          (candidate) =>
            candidate.monthlyPrice < price &&
            getScore(candidate) >= getScore(currentPlan) * 0.9,
        )
        .sort((a, b) => a.monthlyPrice - b.monthlyPrice)[0];

      if (downgrade && downgrade.planName !== currentPlan.planName) {
        recommendations.push({
          toolName: downgrade.toolName,
          planName: downgrade.planName,
          action: "Consider a lower-cost plan within the same vendor",
          reason:
            "Your current usage profile is low, so a lower-tier plan from the same vendor is likely sufficient.",
          currentSpend: input.currentSpend,
          newSpend: downgrade.monthlyPrice,
          savings: input.currentSpend - downgrade.monthlyPrice,
          category: downgrade.category,
          usageBudget: downgrade.usageBudget,
        });
      }
    } else {
      // Get the appropriate score field based on the category
      const upgrade = auditKnowledge
        .filter(
          (candidate) =>
            candidate.monthlyPrice <= price &&
            getScore(candidate) > getScore(currentPlan),
        )
        .sort((a, b) => a.monthlyPrice - b.monthlyPrice)[0];

      if (upgrade && upgrade.planName !== currentPlan.planName) {
        recommendations.push({
          toolName: upgrade.toolName,
          planName: upgrade.planName,
          action: "Consider a lower-cost plan within the same vendor",
          reason:
            "Your current usage profile is low, so a lower-tier plan from the same vendor is likely sufficient.",
          currentSpend: input.currentSpend,
          newSpend: upgrade.monthlyPrice * input.teamSize,
          savings: input.currentSpend - upgrade.monthlyPrice,
          category: upgrade.category,
          usageBudget: upgrade.usageBudget,
        });
      }
    }
  } else if (
    currentPlan &&
    "InputPrice" in currentPlan &&
    input.InputPrice !== undefined &&
    input.OutputPrice !== undefined
  ) {
    const price = currentPlan.InputPrice + currentPlan.OutputPrice;
    const threshold = price * 1.1; // 10% over the listed price is a common threshold for overspend
    if (input.InputPrice + input.OutputPrice > threshold) {
      recommendations.push({
        toolName: currentPlan.toolName,
        planName: currentPlan.planName,
        action: "Review overages and usage patterns",
        reason:
          "Your reported monthly spend exceeds the standard plan price, which often means overages or an unnecessarily large subscription tier.",
        InputPrice: currentPlan.InputPrice,
        OutputPrice: currentPlan.OutputPrice,
        newSpend: price,
        inputSavings: input.InputPrice - currentPlan.InputPrice,
        outputSavings: input.OutputPrice - currentPlan.OutputPrice,
        category: currentPlan.category,
        usageBudget: currentPlan.usageBudget,
      });
    }
    
    if (input.usageLevel === "low") {
      // Get the appropriate score field based on the category
      const downgrade = apiKnowledge
        .filter(
          (candidate) =>{
            if ("InputPrice" in candidate){
            return(candidate.InputPrice + candidate.OutputPrice < price &&
            getScore(candidate) >= getScore(currentPlan) * 0.9)
            }else return false
          }
        )
        .sort((a, b) => (a.InputPrice+ a.OutputPrice) - (b.InputPrice + b.OutputPrice))[0];

      if (downgrade && downgrade.planName !== currentPlan.planName) {
        recommendations.push({
          toolName: downgrade.toolName,
          planName: downgrade.planName,
          action: "Consider a lower-cost plan within the same vendor",
          reason:
            "Your current usage profile is low, so a lower-tier plan from the same vendor is likely sufficient.",
          InputPrice: input.InputPrice ,
          OutputPrice: input.OutputPrice ,
          newSpend: (downgrade.InputPrice + downgrade.OutputPrice)/2,
          inputSavings: input.InputPrice - downgrade.InputPrice,
          outputSavings: input.OutputPrice - downgrade.OutputPrice,
          category: downgrade.category,
          usageBudget: downgrade.usageBudget,
        });
      }
    }else{
      // Get the appropriate score field based on the category
      const upgrade = apiKnowledge
        .filter(
          (candidate) =>{
            if ("InputPrice" in candidate){
            return(candidate.InputPrice + candidate.OutputPrice < price &&
            getScore(candidate) > getScore(currentPlan))
            }else return false
          }
        )
        .sort((a, b) => (a.InputPrice+ a.OutputPrice) - (b.InputPrice + b.OutputPrice))[0];

      if (upgrade && upgrade.planName !== currentPlan.planName) {
        recommendations.push({
          toolName: upgrade.toolName,
          planName: upgrade.planName,
          action: "Consider a lower-cost plan within the same vendor",
          reason:
            "Your current usage profile is low, so a lower-tier plan from the same vendor is likely sufficient.",
          InputPrice: input.InputPrice ,
          OutputPrice: input.OutputPrice ,
          newSpend: (upgrade.InputPrice + upgrade.OutputPrice)/2,
          inputSavings: input.InputPrice - upgrade.InputPrice,
          outputSavings: input.OutputPrice - upgrade.OutputPrice,
          category: upgrade.category,
          usageBudget: upgrade.usageBudget,

        });
      }
    }
    
  }
  return recommendations;
}
