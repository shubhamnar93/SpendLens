import Image from "next/image";
import React from "react";

const testimonials = [
  {
    quote:
      "We had no idea how much we were overspending across ChatGPT, Claude, and other tools. The audit showed duplicate subscriptions and overpriced plans within minutes. The savings report alone made this a no-brainer.",
    role: "CTO",
    company: "Software Company, USA",
    image: "/asset/image1.jpg"
  },
  {
    quote:
      "The audit instantly highlighted tools we were paying for but barely using. We cut unnecessary subscriptions and optimized the rest in a single afternoon.",
    role: "Founder",
    company: "AI Startup, UK",
    image: "/asset/image2.jpg"
  },
  {
    quote:
      "For the first time we have a clear view of our AI spending. No more guessing which plans we actually need or where the money is going.",
    role: "Head of Engineering",
    company: "Fintech Company, Canada",
    image: "/asset/image3.jpg"
  },
];

export const TestimonialItems = React.memo(({ quote, role, company, image }: { quote: string, role: string, company: string, image: string }) => {
  return (<div className="rounded-2xl border-1 border-[#19363F73] bg-[#19363F0D] w-[185px] h-[300px] md:w-[330px] md:h-[420px] p-[18px] md:p-8 flex flex-col justify-between shrink-0">
    <p className="text-[12px] md:text-[16px]">
      “{quote}”
    </p>
    <div className="flex gap-x-2 md:gap-x-4 mt-4 items-center">
      <div className="shrink-0 rounded-full overflow-hidden border border-gray-200 size-[25px] md:size-[50px]">
        <Image alt="" className="scale-125 object-cover object-top w-full h-full" width={8} height={8} src={image} />
      </div>
      <div className="">
        <p className="text-neutral-700 font-medium text-[9px] md:text-[16px]">
          {role}
        </p>
        <p className="text-neutral-700 text-[7px] md:text-sm">
          {company}
        </p>
      </div>
    </div>
  </div>)
})

TestimonialItems.displayName = "TestimonialItems";

export const Testimonials = React.memo(() => {
  return (<section id="testimonials">
    <div className="text-center space-y-2 mt-30">
      <p className="text-neutral-700 uppercase tracking-widest text-[10.5px] md:text-sm">
        Testimonials
      </p>
      <h1 className="text-[30px] md:text-[40px] font-pp-mori-semibold font-semibold">
        Our customer reviews
      </h1>
      <p className="text-neutral-700 text-[12px] md:text-[16px] md:w-[65%] mx-auto">
        See what other clients are saying about their experience with SpendLens
      </p>
      <div className="text-neutral-700 text-[10px] md:text-[14px]">
        <p>(<b>Note</b>: Names, photos, and company names are all mocked. Results are also mocked.)</p>
      </div>
    </div>
    <div className="flex items-center justify-center mt-8 gap-8">
      {testimonials.map((testimonnial, indx) => {
        return <TestimonialItems key={indx} quote={testimonnial.quote} role={testimonnial.role} company={testimonnial.company} image={testimonnial.image} />
      })}
    </div>
  </section>

  )
})

Testimonials.displayName = "Testimonials";
