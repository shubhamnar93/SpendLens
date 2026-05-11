import React from "react";
import { Sparkles } from "../icons/Sparkles";

export const AISummaryBanner = React.memo(({ summary }: { summary: string }) => {
  return (
    <div className="mt-6 rounded-xl border border-[#008b1d33] bg-[#008b1d]/5 bg-primary/5 p-6">
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Sparkles /> SpendLens summary
      </div>
      <p className="mt-2 text-black">{summary}</p>
    </div>
  )
})
