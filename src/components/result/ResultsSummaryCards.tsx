import React from "react";
import { TrendingDown } from "../icons/TrendingDown";
import { Sparkles } from "../icons/Sparkles";

type auditProp = {
  teamSize: number | null;
  shareLinkId: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  monthlySaving: number | null;
  annualSaving: number | null;
  totalCurrentSpend: number | null;
  totalOptimizedSpend: number | null;
  summary: string | null;
} | undefined


export const ResultsSummaryCards = React.memo(({ resultsLength, audit }: { resultsLength: number | undefined, audit: auditProp }) => {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3"> <div className="rounded-xl bg-black p-6 text-white">
      <div className="flex items-center gap-2 text-sm">
        <TrendingDown />
        Monthly savings
      </div>
      <div className="mt-2 text-3xl font-bold">{audit?.monthlySaving}$</div>
    </div>
      <div className="rounded-xl bg-[#006616] p-6 text-white">
        <div className="flex items-center gap-2 text-sm">
          <TrendingDown />
          Annual savings
        </div>
        <div className="mt-2 text-3xl font-bold">{audit?.annualSaving}$</div>
      </div>
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-6">
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          {/* <Sparkles className="h-4 w-4 text-primary" /> */}
          <Sparkles />
          Tools audited
        </div>
        <div className="mt-2 text-3xl font-bold text-black">{resultsLength}</div>
      </div>
    </div>
  )
})

ResultsSummaryCards.displayName = "ResultsSummaryCards";
