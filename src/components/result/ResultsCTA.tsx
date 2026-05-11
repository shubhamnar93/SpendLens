import React from "react";
import { Calender } from "../icons/Calender";
import { Download } from "../icons/Download";

type ResultsCTAProps = {
  totalAnnualSavings: number
  onConsult: () => void
  onReport: () => void
}

export const ResultsCTA = React.memo(({ totalAnnualSavings, onConsult, onReport }: ResultsCTAProps) => {

  return <div className="mt-12 rounded-2xl border border-[#008b1d]/20 bg-gradient-to-br from-[#008b1d]/10 via-background to-background p-8">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-black">
        Ready to capture {totalAnnualSavings}$ a year?
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
        Get a tailored implementation plan from Credex, or take the full
        report with you to share internally.
      </p>
    </div>
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <button
        onClick={onConsult}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow hover:bg-[#008b1d]/90 h-10 rounded-md px-8 bg-[#008b1d] text-white hover:opacity-90">
        <Calender />
        Book consulting with Credex
      </button>
      <button
        onClick={onReport}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background shadow-sm h-10 rounded-md px-8 border-black text-black hover:bg-black hover:text-white">
        <Download />
        Download report
      </button>
    </div>
    <div className="mt-6 text-center">
      <a href="/audit" className="text-sm font-medium text-[#008b1d] hover:underline">Run another audit</a>
    </div>
  </div>
})
