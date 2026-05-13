import type { AuditInput, AuditRecommendation } from "./types";

export interface AuditSummaryPromptParams {
  tools: AuditInput[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  totalCurrentSpend: number;
  insights: string[];
  recommendations: AuditRecommendation[];
}

export interface NvidiaChatResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

const promptInstructions = `You are an AI stack auditor.
Given the user's current AI stack, their spending data, and a list of recommendations, write a 2-3 sentence summary.

Rules:
- 2-3 sentences MAX. No bullet points, no headers, no line breaks.
- Mention the total monthly and annual savings if there are any.
- If a specific tool is underperforming or overpaid, call it out by name.
- If a swap or addition is needed, only recommend from the provided list — use the exact tool name.
- If the stack is fine, say so confidently. Do not force a recommendation.
- Be direct and specific. No vague praise. No hedging.`;

function formatRecommendation(rec: AuditRecommendation): string {
  if (typeof rec.currentSpend === "number" && typeof rec.savings === "number") {
    return `${rec.toolName} toolPrice: ${rec.currentSpend - rec.savings}`;
  }

  if (
    typeof rec.InputPrice === "number" &&
    typeof rec.outputSavings === "number" &&
    typeof rec.OutputPrice === "number" &&
    typeof rec.inputSavings === "number"
  ) {
    return `${rec.toolName} toolPrice: ${rec.InputPrice - rec.inputSavings}/mtok in ${rec.OutputPrice - rec.outputSavings}/mtok out`;
  }

  return rec.toolName;
}

export function buildAuditSummaryPrompt(
  params: AuditSummaryPromptParams,
): string {
  const stackDescription = params.tools.map((tool) => tool.toolName).join(", ");
  const recommendationText = params.recommendations
    .map(formatRecommendation)
    .filter(Boolean)
    .join(", ");
  const insights = params.insights.join(", ");

  return `${promptInstructions}

User's current AI stack: ${stackDescription}

Monthly savings identified: $${params.totalMonthlySavings}
Annual savings identified: $${params.totalAnnualSavings}
Current monthly spend: $${params.totalCurrentSpend}

User's current AI stack: ${insights}

Available recommendations (only suggest from this list): ${recommendationText}`;
}
