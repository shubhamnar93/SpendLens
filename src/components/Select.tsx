"use client"
import React, { useState } from "react";

export const Select = React.memo(({ options, value, setValue, label, ariaLabel }: { options: string[], value: string, setValue: (value: string) => void, label: string, ariaLabel: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <button
        aria-label={ariaLabel}
        onClick={() => setOpen(!open)}
        type="button" role="combobox" aria-controls="radix-_r_2o_" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-[#e2e8f0] bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1 mt-2">
        <span >
          {value.toUpperCase()}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true">
          <path d="m6 9 6 6 6-6">
          </path>
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-full border border-[#e2e8f0] text-sm rounded-md shadow bg-white z-50 ">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setValue(opt);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {opt.toUpperCase()}
            </div>
          ))}
        </div>
      )}
      <select value={value} onChange={(e) => setValue(e.target.value)} hidden>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div >

  )
})

Select.displayName = "Select";


