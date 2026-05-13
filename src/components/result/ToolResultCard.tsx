import { AuditUseCase } from "@/server/audit-engine";
import React from "react";


 type AuditRecommendation = {
  toolName: string
  planName: string
  action: string
  reason: string
  currentSpend?: number | undefined
  inputPrice?: number
  outputPrice?: number
  newSpend: number
  savings?: number
  inputSavings?: number
  outputSavings?: number
  category: AuditUseCase
  usageBudget: string
}

export const ToolResultCard = React.memo(({ recommendation, isApi }: { isApi: boolean, recommendation: AuditRecommendation }) => {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-black">{recommendation.toolName}</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-[#62748e]">
              {recommendation.planName}
            </span>
            <span className="rounded-full bg-[#008b1d]/10 px-2 py-0.5 text-xs font-medium text-[#004D11]">
              {recommendation.category.toUpperCase()}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#62748e]">{recommendation.usageBudget}</p>
        </div>
        {(recommendation.savings ?? 0) > 0 && (
          <div className="rounded-md bg-[#006616] px-3 py-1 text-sm font-semibold text-white">
            Save {recommendation.savings ?? 0}$/mo
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <Metric
          label={isApi ? "Current input price" : "Current spend"}
          value={isApi ? `$${recommendation.inputPrice ?? 0}/M in` : `$${recommendation.currentSpend ?? 0}`}
          sub={isApi ? `$${recommendation.outputPrice ?? 0}/M out` : "per month"}
          isApi={isApi}
        />
        <Metric label="Recommended action" value={recommendation.action} highlight />
        <Metric
          label="Spend after"
          value={isApi ? `$${recommendation.inputPrice && recommendation.inputSavings ?(recommendation.inputPrice - recommendation.inputSavings) : 0}/M in` : `$${recommendation.newSpend}`}
          sub={isApi ? `$${recommendation.outputPrice && recommendation.outputSavings ?(recommendation.outputPrice - recommendation.outputSavings) : 0}/M out` : "per month"}
          isApi={isApi}
        />
        <Metric
          label="Savings"
          value={isApi ? `$${recommendation.inputSavings ?? 0}/M in` : `$${recommendation.savings ?? 0}`}
          sub={isApi ? `$${recommendation.outputSavings}/M out` : "per month"}
          isApi={isApi}
        />
      </div>

      <p className="mt-4 border-t border-[#e2e8f0] pt-3 text-sm text-[#62748e]">
        <span className="font-medium text-black">Why: </span>
        {recommendation.reason}
      </p>
    </div>
  )
})

ToolResultCard.displayName = "ToolResultCard";


function Metric({
  label,
  value,
  sub,
  highlight,
  isApi = false,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  isApi?: boolean;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-[#62748e]">{label}</div>
      <div
        className={
          "mt-1 text-base font-semibold " + (highlight ? "text-[#006616]" : "text-black")
        }
      >
        {value}
      </div>
      {sub && <div className={isApi? "mt-1 text-base font-semibold ": "text-xs text-[#62748e]"}>{sub}</div>}
    </div>
  );
}
