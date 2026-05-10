"use client"

import { Button } from "@/components/Button"
import { Headers } from "@/components/Headers"
import { Input } from "@/components/Input"
import { Select } from "@/components/Select"
import { auditKnowledge } from "../../server/audit-engine/knowledge/dataset"
import React, { useState } from "react"

type ToolForm = {
  toolName: string
  planName: string
  usageLevel: string
  useCase: string
  currentSpend?: string
  inputToken?: string
  outputToken?: string
  teamSize: string
}

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
        <p className="mt-2 text-muted-foreground">Add each AI tool your team uses. We'll compute savings on the next page.</p>
      </div>
      {tools.map((tool, i) => (
        <div key={i} className="rounded-lg mt-10 border border-[#e2e8f0] bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-secondary">Tool #{i + 1}</h2>

            {tools.length > 1 && (
              <button onClick={() => setTools(prev => prev.filter((_, idx) => idx !== i))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2 h-4 w-4" aria-hidden="true">
                  <path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Tool name"
              options={toolOptions}
              value={tool.toolName}
              setValue={(v) => updateTool(i, "toolName", v)}
            />

            <Select
              label="Plan name"
              options={getPlansForTool(tool.toolName)}
              value={tool.planName}
              setValue={(v) => updateTool(i, "planName", v)}
            />

            <Select
              label="Usage level"
              options={usageLevel}
              value={tool.usageLevel}
              setValue={(v) => updateTool(i, "usageLevel", v)}
            />

            <Select
              label="Primary usecase"
              options={useCaseOptions}
              value={tool.useCase}
              setValue={(v) => updateTool(i, "useCase", v)}
            />

            {tool.useCase !== "api" ? (
              <Input
                label="Current spend"
                required
                value={tool.currentSpend}
                onChange={(e) => updateTool(i, "currentSpend", e.target.value)}
                placeholder="100"
              />
            ) : (
              <>
                <Input
                  label="Input price ($/M tokens)"
                  required
                  value={tool.inputToken}
                  onChange={(e) => updateTool(i, "inputToken", e.target.value)}
                  placeholder="100"
                />
                <Input
                  label="Output price ($/M tokens)"
                  required
                  value={tool.outputToken}
                  onChange={(e) => updateTool(i, "outputToken", e.target.value)}
                  placeholder="100"
                />
              </>
            )}

            <Input
              label="Team size"
              required
              value={tool.teamSize}
              onChange={(e) => updateTool(i, "teamSize", e.target.value)}
              placeholder="5"
            />
          </div>
        </div>
      ))}
      <div className="flex mt-4 items-center justify-center gap-4">
        <Button onClick={() => setTools(prev => [...prev, createEmptyTool()])} variant="ghost" className="hover:scale-none" label="+ Add another tool" size="xs" />
        <Button variant="solid" className="bg-green-800" label="Run audit" size="xs" />
      </div>
    </main>

  )
}
