"use client"
import { Button } from "@/components/Button"
import { Headers } from "@/components/Headers"
import { Calender } from "@/components/icons/Calender"
import { Download } from "@/components/icons/Download"
import { Sparkles } from "@/components/icons/Sparkles"
import { TrendingDown } from "@/components/icons/TrendingDown"
import { AISummaryBanner } from "@/components/result/AISummaryBanner"
import { LeadCaptureDialog } from "@/components/result/LeadCaptureDialog"
import { ResultsCTA } from "@/components/result/ResultsCTA"
import { ResultsSummaryCards } from "@/components/result/ResultsSummaryCards"
import { ToolResultCard } from "@/components/result/ToolResultCard"
import { AuditRecommendation } from "@/server/audit-engine"
import React from "react"

export default function ResultPage() {
  const bestCheapestAI: AuditRecommendation = {
    toolName: "ChatGpt",
    planName: "Go",
    action: "Review overages and usage patterns",
    reason:
      "Your reported monthly spend exceeds the standard plan price, which often means overages or an unnecessarily large subscription tier.",
    currentSpend: 100,
    // InputPrice?: number
    // OutputPrice?: number
    newSpend: 4.25,
    savings: 95.75,
    // inputSavings?: number
    // outputSavings?: number
    category: "coding",
    usageBudget: "High",
  }
  const results = [{
    toolName: "ChatGpt",
    planName: "Go",
    currentSpend: 100,
    // InputPrice: input.InputPrice ? input.InputPrice : undefined,
    // OutputPrice: input.OutputPrice,
    recommendations: [bestCheapestAI, bestCheapestAI],
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
           which could save you approximately $${100} per month `,
      ]
      : [
        "Your current plan appears to be cost-effective based on our analysis.",
      ],
  }, {
    toolName: "ChatGpt",
    planName: "Go",
    currentSpend: 100,
    // InputPrice: input.InputPrice ? input.InputPrice : undefined,
    // OutputPrice: input.OutputPrice,
    recommendations: [bestCheapestAI, bestCheapestAI],
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
           which could save you approximately $${100} per month `,
      ]
      : [
        "Your current plan appears to be cost-effective based on our analysis.",
      ],
  }]
  const totalAnnualSavings = 900
  const summary = "Your stack found roughly $75/month ($900/yr) in savings across 1 tool. Biggest win: downgrade pro or consolidate seats on jie — You're paying well above the moderate-usage benchmark for 1 seat(s)."
  const [open, setOpen] = React.useState(false)
  const [intent, setIntent] = React.useState<"consulting" | "report">("consulting")
  const onConsult = () => { setOpen(true); setIntent("consulting"); }
  const onReport = () => { setOpen(true); setIntent("report"); }
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Headers />
      <h1 className="text-3xl mt-20 font-bold tracking-tight text-black">Your audit results</h1>
      <p className="mt-2 text-[#62748e]">
        {results.length} tool{results.length > 1 ? "s" : ""} reviewed for Your stack.
      </p>

      {/* Summary cards */}
      <ResultsSummaryCards results={results} />

      {/* AI summary */}
      <AISummaryBanner summary={summary} />
      {/* Per-tool cards */}
      <div className="mt-8 space-y-4">
        {results.map((ra, i) => {
          const r = ra.recommendations[0]
          const isApi = r.category === "api";
          return (
            <ToolResultCard recommendation={r} isApi={isApi} key={i} />
          );
        })}
      </div>
      <ResultsCTA onConsult={onConsult} onReport={onReport} totalAnnualSavings={totalAnnualSavings} />
      <LeadCaptureDialog open={open} intent={intent} onOpenChange={setOpen} onSubmit={() => { }} key={1} />
    </main>
  )

}

