"use client"
import { Button } from "@/components/Button"
import { Headers } from "@/components/Headers"
import { auditKnowledge, apiKnowledge } from "../../server/audit-engine/knowledge/dataset"
import { useState } from "react"
import { ToolCard } from "@/components/audit/ToolCard"
import { ToolForm } from "@/types/audit"
import { useTRPCClient } from "@/trpc/client"
import { useRouter } from "next/navigation"

export default function AuditPage() {
  const trpcClient = useTRPCClient()
  const router = useRouter()
  const usageLevel: string[] = ["low", "medium", "high"]
  const useCaseOptions = ['coding', 'writing', 'research', 'mixed', 'data', 'api']

  const getKnowledgeSource = (useCase: string) => {
    return useCase === 'api' ? apiKnowledge : auditKnowledge
  }

  const getToolOptions = (useCase: string) => {
    return Array.from(
      new Set(
        getKnowledgeSource(useCase).map(t => t.toolName)
      )
    )
  }

  // plans by tool (IMPORTANT)
  const getPlansForTool = (tool: string, useCase: string) => {
    return getKnowledgeSource(useCase)
      .filter(t => t.toolName === tool)
      .map(t => t.planName)
  }
  const createEmptyTool = (): ToolForm => {
    const defaultUseCase = useCaseOptions[0]
    const defaultTool = getToolOptions(defaultUseCase)[0]

    return {
      toolName: defaultTool,
      planName: getPlansForTool(defaultTool, defaultUseCase)[0],
      usageLevel: "low",
      useCase: defaultUseCase,
      currentSpend: "",
      inputToken: "",
      outputToken: "",
      teamSize: "",
    }
  }
  const [tools, setTools] = useState<ToolForm[]>([createEmptyTool()])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!tools.length) return

    const payload = {
      tools: tools.map((tool) => ({
        toolName: tool.toolName,
        planName: tool.planName,
         ...(tool.useCase !== 'api'
      ? {
          currentSpend: Number(tool.currentSpend || 0),
        }
      : {}),

    ...(tool.useCase === 'api'
      ? {
          InputPrice: Number(tool.inputToken || 0),
          OutputPrice: Number(tool.outputToken || 0),
        }
      : {}),
        usageLevel: tool.usageLevel as 'low' | 'medium' | 'high',
        teamSize: Number(tool.teamSize || 0),
        primaryUseCase: tool.useCase as 'coding' | 'writing' | 'research' | 'mixed' | 'data' | 'api',
      })),
    }
    setIsSubmitting(true)
    try {
      const result = await trpcClient.audit.runAudit.mutate(payload)
      router.push(`/result/${result.shareLinkId}`)
    } catch (error) {
      console.error('Audit request failed', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateTool = (index: number, field: keyof ToolForm, value: string) => {
    setTools(prev => {
      const updated = [...prev]
      const current = { ...updated[index], [field]: value }

      if (field === "toolName") {
        current.planName = getPlansForTool(value, current.useCase)[0]
      }

      if (field === "useCase") {
        const nextTool = getToolOptions(value)[0]
        current.toolName = nextTool
        current.planName = getPlansForTool(nextTool, value)[0]
      }

      updated[index] = current
      return updated
    })
  }
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Headers />
      <div className="mt-30">
        <h1 className="text-3xl font-bold tracking-tight text-secondary">AI Stack Audit</h1>
        <p className="mt-2 text-[#62748e]">Add each AI tool your team uses. We&apos;ll compute savings on the next page.</p>
      </div>
      {tools.map((tool, i) => (
        <ToolCard
          key={i}
          index={i}
          tool={tool}
          canDelete={tools.length > 1}
          getPlansForTool={(toolName) => getPlansForTool(toolName, tool.useCase)}
          setTools={setTools}
          toolOptions={getToolOptions}
          updateTool={updateTool}
          usageLevel={usageLevel}
          useCaseOptions={useCaseOptions} />

      ))}
      <div className="flex mt-4 items-center justify-center gap-4">
        <Button onClick={() => setTools(prev => [...prev, createEmptyTool()])} variant="ghost" className="hover:scale-none" label="+ Add another tool" size="xs" />
        <Button onClick={handleSubmit}  disabled={isSubmitting} variant="solid" className={isSubmitting ? "bg-green-800/50 cursor-progress" : "bg-green-800"} label={isSubmitting ? "Running…" : "Run audit"} size="xs" />
      </div>
    </main>

  )
}
