import React from "react";
import { Button } from "../Button";

export const Hero = React.memo(() => {
  return (
    <>
      <div>
        <div className="absolute z-10 -top-[200px] md:-top-[205px] h-1/2 left-1/2 -translate-x-1/2">
          <svg width="1133" height="1038" viewBox="0 0 1133 1038" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
              <path d="M137.008 1037.38L137.008 -95.6249M279.974 1037.38L279.974 -95.6249M422.939 1037.38L422.939 -95.6249M565.904 1037.38L565.904 -95.6249M708.87 1037.38L708.87 -95.6249M851.835 1037.38L851.835 -95.6249M994.8 1037.38L994.8 -95.6249M3.74941e-05 41.3836H1133M3.12451e-05 184.349H1133M2.49961e-05 327.314H1133M1.87471e-05 470.28H1133M1.2498e-05 613.245H1133M6.24902e-06 756.21H1133M0 899.176H1133" stroke="url(#paint0_radial_121_920)"></path>
            </g>
            <defs>
              <radialGradient id="paint0_radial_121_920" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(566.5 470.875) rotate(90) scale(566.5)">
                <stop stopColor="#24D600"></stop>
                <stop offset="1" stopColor="#333333" stopOpacity="0"></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flex relative isolate overflow-hidden flex-col z-50 items-center justify-center mt-42 p-8">
        <div className="border-[1px] border-[#D9D9D9] py-2 px-6 rounded-full flex items-center">Free ai expense audit</div>
        <div className="text-[48px] md:text-[72px] text-center leading-[50px] md:py-[32px]">
          <p className="bg-gradient-to-r from-[#0FF395] to-[#086841] bg-clip-text text-transparent font-semibold font-pp-mori-semibold py-5">
            Save Up To 60%
          </p>
          <div className="font-semibold font-pp-mori-semibold mx-auto leading-tight text-[24px] md:text-[72px] px-2 md:px-0 mt-2 md-0">
            <p>Run Free AI Audit &amp; Optimise Expense</p>
          </div>
          <div className="text-[18px] md:text-[20px] text-center md:mt-0 px-1 leading-tight pt-[22px]" >
            <p>
              Stop wasting money on AI subscriptions you don’t need. Discover smarter plans and cut your monthly spend in minutes.
            </p>
          </div>
        </div>
        <div className="z-50 flex gap-8">
          <Button variant="outline" label="Start Buying Credit" as="a" href={"https://credex.rocks/"} />
          <Button variant="solid" label="Run Free Audit" as="a" href="audit" />
        </div>
      </div>
    </>
  )
})

Hero.displayName = "Hero";
