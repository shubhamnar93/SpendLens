import React from "react";
import { TrendingDown } from "../icons/TrendingDown";
import { Sparkles } from "../icons/Sparkles";
import { AuditResult } from "@/server/audit-engine";

export const ResultsSummaryCards = React.memo(({ results }: { results: AuditResult[] }) => {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3"> <div className="rounded-xl bg-black p-6 text-white">
      <div className="flex items-center gap-2 text-sm">
        <TrendingDown />
        Monthly savings
      </div>
      <div className="mt-2 text-3xl font-bold">{100}</div>
    </div>
      <div className="rounded-xl bg-[#006616] p-6 text-white">
        <div className="flex items-center gap-2 text-sm">
          <TrendingDown />
          Annual savings
        </div>
        <div className="mt-2 text-3xl font-bold">{1200}</div>
      </div>
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-6">
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          {/* <Sparkles className="h-4 w-4 text-primary" /> */}
          <Sparkles />
          Tools audited
        </div>
        <div className="mt-2 text-3xl font-bold text-black">{results.length}</div>
      </div>
    </div>
  )
})

ResultsSummaryCards.displayName = "ResultsSummaryCards";
