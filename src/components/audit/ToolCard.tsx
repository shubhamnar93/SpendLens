import React from "react"
import { Select } from "../Select"
import { Input } from "../Input"
import { SpenFields } from "./SpendFields"
import { ToolForm } from "@/types/audit"



type ToolCardProps = {
  index: number,
  canDelete: boolean,
  toolOptions: (category: string) => string[]
  getPlansForTool: (toolName: string) => string[]
  updateTool: (i: number, s: keyof ToolForm, st: string) => void
  tool: ToolForm
  setTools: React.Dispatch<React.SetStateAction<ToolForm[]>>
  usageLevel: string[]
  useCaseOptions: string[]
}

export const ToolCard = React.memo<ToolCardProps>((props) => {
  const { index, canDelete, toolOptions, getPlansForTool, updateTool, tool, setTools, usageLevel, useCaseOptions } = props
  console.log(tool.useCase)
  return <div className="rounded-lg mt-10 border border-[#e2e8f0] bg-card p-5">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-semibold text-secondary">Tool #{index + 1}</h2>

      {canDelete && (
        <button onClick={() => setTools((prev) => prev.filter((_, idx) => idx !== index))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2 h-4 w-4" aria-hidden="true">
            <path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      )}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <Select
        ariaLabel="Tool name options"
        label="Tool name"
        options={toolOptions(tool.useCase)}
        value={tool.toolName}
        setValue={(v) => updateTool(index, "toolName", v)}
      />

      <Select
        ariaLabel="Plan name options"
        label="Plan name"
        options={getPlansForTool(tool.toolName)}
        value={tool.planName}
        setValue={(v) => updateTool(index, "planName", v)}
      />

      <Select
        ariaLabel="Usage level options"
        label="Usage level"
        options={usageLevel}
        value={tool.usageLevel}
        setValue={(v) => updateTool(index, "usageLevel", v)}
      />

      <Select
        ariaLabel="Primary useCase options"
        label="Primary usecase"
        options={useCaseOptions}
        value={tool.useCase}
        setValue={(v) => updateTool(index, "useCase", v)}
      />

      <SpenFields tool={tool} updateTool={updateTool} index={index} />

      <Input
        label="Team size"
        required
        value={tool.teamSize}
        onChange={(e) => updateTool(index, "teamSize", e.target.value)}
        placeholder="5"
      />
    </div>
  </div>
})

ToolCard.displayName = "ToolCard";
