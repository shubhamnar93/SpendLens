"use client"
import { memo, useState } from "react";

export const FAQItem = memo(({ question, answer }: { question: string, answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`py-[22px] px-[24px] rounded-xl w-[95%] md:w-[70%] mx-auto cursor-pointer transition-all duration-300 
      ${open ? "bg-[#1C1C1C14]" : "bg-[#12121205]"}`}
    >
      {/* Question row */}
      <div className="flex justify-between items-center">
        <p className="font-pp-mori-semibold font-semibold text-[14px] md:text-[16px]">
          {question}
        </p>

        {/* ICON SWITCH */}
        {open ? (
          /* UP ARROW (open) */
          <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0">
            <rect width="32" height="32" rx="12" fill="#242424" />
            <path
              d="M15.9992 13.0501L21.2992 17.9251C21.4826 18.1084 21.5742 18.3418 21.5742 18.6251C21.5742 18.9084 21.4826 19.1418 21.2992 19.3251C21.1159 19.5084 20.8826 19.6001 20.5992 19.6001C20.3159 19.6001 20.0826 19.5084 19.8992 19.3251L15.9992 15.4251L12.0992 19.3251C11.9159 19.5084 11.6826 19.6001 11.3992 19.6001C11.1159 19.6001 10.8826 19.5084 10.6992 19.3251C10.5159 19.1418 10.4242 18.9084 10.4242 18.6251C10.4242 18.3418 10.5159 18.1084 10.6992 17.9251L15.2992 13.3251Z"
              fill="#A0A0A0"
            />
          </svg>
        ) : (
          /* DOWN ARROW (closed) */
          <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0">
            <rect width="32" height="32" rx="12" fill="#242424" fillOpacity="0.05" />
            <path
              d="M16.0008 18.9499L10.7008 14.0749C10.5174 13.8916 10.4258 13.6582 10.4258 13.3749C10.4258 13.0916 10.5174 12.8582 10.7008 12.6749C10.8841 12.4916 11.1174 12.3999 11.4008 12.3999C11.6841 12.3999 11.9174 12.4916 12.1008 12.6749L16.0008 16.5749L19.9008 12.6749C20.0841 12.4916 20.3174 12.3999 20.6008 12.3999C20.8841 12.3999 21.1174 12.4916 21.3008 12.6749C21.4841 12.8582 21.5758 13.0916 21.5758 13.3749C21.5758 13.6582 21.4841 13.8916 21.3008 14.0749L16.7008 18.6749Z"
              fill="#A0A0A0"
            />
          </svg>
        )}
      </div>

      {/* ANSWER */}
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-[#00000080] text-[14px] md:text-[16px]">
          {answer}
        </p>
      </div>
    </div>
  );
})

FAQItem.displayName = "FAQItem";
