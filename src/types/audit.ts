import { AppRouter } from "@/trpc/routers/_app"
import { inferProcedureOutput } from "@trpc/server"

export type ToolForm = {
  toolName: string
  planName: string
  usageLevel: string
  useCase: string
  currentSpend?: string
  inputToken?: string
  outputToken?: string
  teamSize: string
}

export type AuditResult = inferProcedureOutput<AppRouter['audit']['getAudit']>
