"use client"

import { Button } from "@/components/Button"
import { Headers } from "@/components/Headers"
import { auditKnowledge } from "../../server/audit-engine/knowledge/dataset"
import { useState } from "react"
import { ToolCard } from "@/components/audit/ToolCard"
import { ToolForm } from "@/types/audit"

export default function AuditPage() {
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
        <Button variant="solid" className="bg-green-800" label="Run audit" size="xs" />
      </div>
    </main>

  )
}
