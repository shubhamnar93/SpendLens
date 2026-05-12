import React from "react"
import { FAQItem } from "./FAQItem"

const QNA = [
  {
    "question": "How does the AI Spend Audit work?",
    "answer": "You enter the AI tools your team uses and your current plans. We analyze pricing, usage patterns, and alternatives to show where you can save money instantly."
  },
  {
    "question": "Do I need to connect my accounts?",
    "answer": "No. The audit works without integrations. You can optionally provide more details for a more accurate savings estimate."
  },
  {
    "question": "Is the audit really free?",
    "answer": "Yes. The full savings report is free. We only offer optional paid consultation if you want help implementing the recommendations."
  },
  {
    "question": "How accurate are the savings estimates?",
    "answer": "Estimates are based on real pricing data and benchmark usage patterns. Actual savings may vary depending on your team’s usage."
  },
  {
    "question": "Who is this product for?",
    "answer": "Startups, agencies, and teams that use multiple AI tools and want to reduce unnecessary subscription costs."
  }
]

export const FAQ = React.memo(() => {
  return <section id="FAQ" className="mt-30">
    <div className="text-center">
      <h1 className="text-[22.5px] md:text-[40px] font-pp-mori-semibold font-semibold">
        Your Questions. Answered.
      </h1>
      <p className="text-neutral-700 text-[12px] md:text-[16px]">
        Answers to all your questions, quickly and clearly
      </p>
    </div>
    <div className="pt-10 space-y-3">
      <div>
        {QNA.map((qna, indx) => (
          <FAQItem key={indx} question={qna.question} answer={qna.answer} />
        ))}
      </div>
    </div>
  </section>
})

FAQ.displayName = "FAQ";
