import React from "react";

export const HowItWorks = React.memo(() => {
  return (
    <section id="HowItWorks" className="mt-30 md:grid md:grid-cols-2 max-w-6xl mx-auto">
      <div className="flex  justify-center items-center">
        <p className="text-[30px] md:text-[40px] font-semibold tracking-tight md:w-[95%] line-clamp-6 leading-tight">
          A simple,
          <span className="mx-2 bg-gradient-to-r from-[#20B801] to-[rgb(12,66,1)] bg-clip-text text-transparent">
            secure 3 step process
          </span>
          to get your ai expense report in minutes,
          <span className="mx-2 line-through text-red-700">
            not days
          </span>
        </p>
      </div>
      <div>
        <div >
          <div className="size-10 rounded-full text-center flex justify-center items-center pt-[2.5px] bg-[#19363F] text-white shadow-[inset_0px_0px_13.35px_0px_#FFFFFF66,0px_16.02px_10.68px_-5.34px_#19363F26]">
            01
          </div>
          <div className="mt-2">
            <p className="font-semibold text-[17px] md:text-[24px] font-pp-mori-semibold">
              Fill the Audit Form
            </p>
            <p className="text-black font-pp-mori-regular">
              Enter your AI tools, usage, and monthly spend to start your free audit.
            </p>
          </div>
        </div>
        <div >
          <div className="size-10 rounded-full text-center flex justify-center items-center pt-[2.5px] bg-[#19363F] text-white shadow-[inset_0px_0px_13.35px_0px_#FFFFFF66,0px_16.02px_10.68px_-5.34px_#19363F26]">
            02
          </div>
          <div className="mt-2">
            <p className="font-semibold text-[17px] md:text-[24px] font-pp-mori-semibold">
              Get Your Savings Report
            </p>
            <p className="text-black font-pp-mori-regular">
              We instantly analyze your stack and show where you’re overspending and how much you can save.
            </p>
          </div>
        </div>
        <div >
          <div className="size-10 rounded-full text-center flex justify-center items-center pt-[2.5px] bg-[#19363F] text-white shadow-[inset_0px_0px_13.35px_0px_#FFFFFF66,0px_16.02px_10.68px_-5.34px_#19363F26]">
            03
          </div>
          <div className="mt-2">
            <p className="font-semibold text-[17px] md:text-[24px] font-pp-mori-semibold">
              Download or Book Consultation
            </p>
            <p className="text-black font-pp-mori-regular">
              Download your report or optionally book a consultation to optimize your AI spend.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
})

HowItWorks.displayName = "HowItWorks";
