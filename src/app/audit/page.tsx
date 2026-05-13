"use client"
import { Button } from "@/components/Button"
import { Headers } from "@/components/Headers"
import { auditKnowledge } from "../../server/audit-engine/knowledge/dataset"
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
  const toolOptions = Array.from(
    new Set(auditKnowledge.map(t => t.toolName))
  )

  // plans by tool (IMPORTANT)
  const getPlansForTool = (tool: string) => {
    return auditKnowledge
      .filter(t => t.toolName === tool)
      .map(t => t.planName)
  }
  const createEmptyTool = (): ToolForm => ({
    toolName: toolOptions[0],
    planName: getPlansForTool(toolOptions[0])[0],
    usageLevel: "low",
    useCase: "coding",
    currentSpend: "",
    inputToken: "",
    outputToken: "",
    teamSize: "",
  })
  const [tools, setTools] = useState<ToolForm[]>([createEmptyTool()])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!tools.length) return

    const payload = { tools: tools.map((tool) => ({
        toolName: tool.toolName,
        planName: tool.planName,
        currentSpend: tool.useCase === 'api' ? undefined : Number(tool.currentSpend || 0),
        InputPrice: tool.useCase === 'api' ? Number(tool.inputToken || 0) : undefined,
        OutputPrice: tool.useCase === 'api' ? Number(tool.outputToken || 0) : undefined,
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
      updated[index] = { ...updated[index], [field]: value }

      // if tool changes → reset plan
      if (field === "toolName") {
        updated[index].planName = getPlansForTool(value)[0]
      }

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
          getPlansForTool={getPlansForTool}
          setTools={setTools}
          toolOptions={toolOptions}
          updateTool={updateTool}
          usageLevel={usageLevel}
          useCaseOptions={useCaseOptions} />

      ))}
      <div className="flex mt-4 items-center justify-center gap-4">
        <Button onClick={() => setTools(prev => [...prev, createEmptyTool()])} variant="ghost" className="hover:scale-none" label="+ Add another tool" size="xs" />
        <Button onClick={handleSubmit} variant="solid" className={isSubmitting?"bg-green-800/50 cursor-progress":"bg-green-800"} label={isSubmitting ? "Running…" : "Run audit"} size="xs" />
      </div>
    </main>

  )
}
