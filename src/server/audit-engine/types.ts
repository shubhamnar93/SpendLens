export type AuditUseCase = 'coding' | 'writing' | 'research' | 'mixed' | 'data' | 'api'

export type AuditUsageLevel = 'low' | 'medium' | 'high'

export type AuditToolPlan = {
  toolName: string
  planName: string
  category: AuditUseCase
  monthlyPrice: number
  valueScore: number
  codingScore: number,
  writingScore: number,
  dataScore: number,
  researchScore: number,
  mixedScore: number,
  tier: number
  contextWindow: string
  usageBudget: string
  description: string
  marketPosition: 'value' | 'balanced' | 'premium'
  minTeamSize: number
}

export type AuditAPIPlan = {
  toolName: string
  planName: string
  category: AuditUseCase
  InputPrice: number
  OutputPrice: number
  valueScore: number
  codingScore: number,
  writingScore: number,
  dataScore: number,
  researchScore: number,
  mixedScore: number,
  tier: number
  contextWindow: string
  usageBudget: string
  description: string
  marketPosition: 'value' | 'balanced' | 'premium'

}


export type AuditInput = {
  toolName: string
  planName: string
  currentSpend?: number
  InputPrice?: number
  OutputPrice?: number
  usageLevel: AuditUsageLevel
  teamSize: number
  primaryUseCase: AuditUseCase
}

export type AuditRecommendation = {
  toolName: string
  planName: string
  action: string
  reason: string
  currentSpend?: number
  InputPrice?: number
  OutputPrice?: number
  newSpend: number
  savings?: number
  inputSavings?: number
  outputSavings?: number
  category: AuditUseCase
  usageBudget: string
}

export type AuditBenchmark = {
  spendPerDeveloper: number | null
  categoryAverage: number
  verdict: string
}

export type AuditResult = {
  toolName: string
  planName: string
  currentSpend?: number
  InputPrice?: number
  OutputPrice?: number
  recommendations: AuditRecommendation[]
  totalInputSavings?: number
  totalOutputSavings?: number
  totalMonthlySavings?: number
  totalAnnualSavings?: number
  insights: string[]
  benchmark?: AuditBenchmark
}
