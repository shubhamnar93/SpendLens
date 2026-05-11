import React from "react";
import { Input } from "../Input";
import { ToolForm } from "@/types/audit";


type SpendFieldsProps = {
  tool: ToolForm
  index: number
  updateTool: (i: number, s: keyof ToolForm, st: string) => void
}

export const SpenFields = React.memo(({ tool, updateTool, index }: SpendFieldsProps) => {
  if (tool.useCase !== "api") {
    return <Input
      label="Current spend"
      required
      value={tool.currentSpend}
      onChange={(e) => updateTool(index, "currentSpend", e.target.value)}
      placeholder="100"
    />
  } else {
    return <>
      <Input
        label="Input price ($/M tokens)"
        required
        value={tool.inputToken}
        onChange={(e) => updateTool(index, "inputToken", e.target.value)}
        placeholder="100"
      />
      <Input
        label="Output price ($/M tokens)"
        required
        value={tool.outputToken}
        onChange={(e) => updateTool(index, "outputToken", e.target.value)}
        placeholder="100"
      />
    </>
  }
})

