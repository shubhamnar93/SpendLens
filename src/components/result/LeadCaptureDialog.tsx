"use client"
import { z } from "zod";
import { Input } from "../Input";
import { Button } from "../Button";
import { useState } from "react";
import { Calender } from "../icons/Calender";
import { Download } from "../icons/Download";


export type LeadIntent = "consulting" | "report";

export interface LeadData {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  intent: LeadIntent;
  createdAt: string;
}

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  role: z.string().trim().max(80).optional().or(z.literal("")),
  teamSize: z
    .union([z.string().length(0), z.coerce.number().int().min(1).max(100000)])
    .optional(),
});

interface Props {
  open: boolean;
  intent: LeadIntent | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (lead: LeadData) => void;
}

export function LeadCaptureDialog(

  { open, intent, onOpenChange, onSubmit }: Props
) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, companyName, role, teamSize });
    if (!parsed.success) {
      return;
    }
    if (!intent) return;
    const lead: LeadData = {
      email: parsed.data.email,
      companyName: parsed.data.companyName || undefined,
      role: parsed.data.role || undefined,
      teamSize:
        typeof parsed.data.teamSize === "number" ? parsed.data.teamSize : undefined,
      intent,
      createdAt: new Date().toISOString(),
    };
    try {
      const key = "spendlens-leads";
      const prev = JSON.parse(sessionStorage.getItem(key) || "[]");
      sessionStorage.setItem(key, JSON.stringify([...prev, lead]));
    } catch {
      /* ignore */
    }
    onSubmit(lead);
    setEmail("");
    setCompanyName("");
    setRole("");
    setTeamSize("");
  }
  //
  return (
    <div className={`${!open && "hidden"} fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}>
      <div role="dialog"
        id="radix-_r_0_"
        aria-describedby="radix-_r_2_"
        aria-labelledby="radix-_r_1_"
        data-state="open"
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[#e2e8f0]  bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-md"
        tabIndex={-1}>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 id="radix-_r_1_" className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2 text-secondary">
            {intent == "consulting" ? <Calender className="flex h-5 w-5 mr-[0px]" /> : <Download className="flex h-5 w-5 mr-[0px]" />}
            {intent == "consulting" ? "Book consulting with Credex" : "Download your audit report"}
          </h2>
          <p id="radix-_r_2_" className="text-sm text-[#62748e]">
            {intent == "consulting" ? "Tell us where to send your booking link." : "Enter your details and we'll prepare your report."}
          </p>
        </div>


        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input required label="Work email" placeholder="you@comapany.com" />
          <Input label="Company name (optional)" placeholder="company name" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Role (optional)" placeholder="cto, ceo, ..." />
            <Input label="Team size (optional)" placeholder="5" />
          </div>
          <Button as="button" label={intent == "report" ? "Download report" : "Get my booking link"} className=" bg-[#008b1d] text-md p-[8px] w-full rounded-xl flex justify-center items-center hover:scale-none hover:bg-[#008b1d]/85" />
        </form>


        <button
          onClick={() => onOpenChange(false)}
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-[#62748e]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4" aria-hidden="true">
            <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>

      </div>
    </div>
  );
}
