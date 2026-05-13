"use client"
import { AISummaryBanner } from "@/components/result/AISummaryBanner"
import { LeadCaptureDialog } from "@/components/result/LeadCaptureDialog"
import { ResultsCTA } from "@/components/result/ResultsCTA"
import { ResultsSummaryCards } from "@/components/result/ResultsSummaryCards"
import { ToolResultCard } from "@/components/result/ToolResultCard"
import { AuditRecommendation } from "@/server/audit-engine"
import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import { useTRPCClient } from "@/trpc/client"
import { AuditResult } from "@/types/audit"

export default function ResultPage() {
  const trpcClient = useTRPCClient()
  const { shareLinkId }: { shareLinkId: string } = useParams()
  const [data, setData] = React.useState<AuditResult | null>(null)
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    async function loadAudit() {
      try {
        const result = await trpcClient.audit.getAudit.query({ shareLinkId })
        setData(result)
      } catch (err) {
        console.error("Failed to load audit", err)
      } finally {
        setLoading(false)
      }
    }

    loadAudit()
  }, [shareLinkId, trpcClient.audit.getAudit])

  const [open, setOpen] = React.useState(false)
  const [intent, setIntent] = React.useState<"consulting" | "report">("consulting")
  const onConsult = () => { setOpen(true); setIntent("consulting"); }
  const onReport = () => { setOpen(true); setIntent("report"); }

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          <p className="text-[#62748e]">Loading your audit results...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl mt-20 font-bold tracking-tight text-black">Your audit results</h1>
      <p className="mt-2 text-[#62748e]">
        {data?.recommendations.length} tool{data?.recommendations.length ? data.recommendations.length > 1 ? "s" : "" : ""} reviewed for Your stack.
      </p>

      <ResultsSummaryCards resultsLength={data?.recommendations.length} audit={data?.audit} />

      <AISummaryBanner summary={data?.audit.summary || ""} />

      <div className="mt-8 space-y-4">
        {data?.recommendations.map((ra, i) => {
          const isApi = ra.category === "api";
          if (ra.currentSpend === undefined) return null; // hide zero-spend tools for now
          return (
            <ToolResultCard recommendation={ra as AuditRecommendation} isApi={isApi} key={i} />
          );
        })}
      </div>
      <ResultsCTA onConsult={onConsult} onReport={onReport} totalAnnualSavings={data?.audit.annualSaving || 0} />
      <LeadCaptureDialog open={open} intent={intent} onOpenChange={setOpen} onSubmit={() => { }} key={1} />
    </main>
  )

}
