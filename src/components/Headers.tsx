"use client"
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


export const Headers = React.memo(() => {

  const pathname = usePathname();
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling DOWN -> hide
        setShowHeader(false);
      } else {
        // scrolling UP -> show
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);
  const scrollToSection = (id: string) => {
     if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -80;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };


  return <header
    className={`fixed top-4 left-0 z-50 w-full flex justify-center transition-transform duration-500 
  ${showHeader ? "translate-y-0" : "-translate-y-[120%]"}`}>
    <div className="bg-white/80 rounded-full backdrop-blur-md shadow-sm py-2 px-8 w-[90%] border border-[#D9D9D9] flex items-center justify-between">
      <Link className="flex items-center" href="/">
        <svg className="w-8 h-8 mr-3" fill="#086841" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#086841">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>lens</title>
            <path d="M0 13.024q0-2.624 1.024-5.056t2.784-4.16 4.16-2.752 5.056-1.056q2.656 0 5.056 1.056t4.16 2.752 2.784 4.16 1.024 5.056q0 3.616-1.984 6.816l7.072 7.040q0.864 0.896 0.864 2.144t-0.864 2.112-2.144 0.864-2.112-0.864l-7.040-7.040q-3.2 1.952-6.816 1.952-2.656 0-5.056-1.024t-4.16-2.784-2.784-4.128-1.024-5.088zM4 13.024q0 2.464 1.216 4.544t3.296 3.264 4.512 1.216q1.824 0 3.488-0.704t2.88-1.92 1.92-2.88 0.736-3.52-0.736-3.52-1.92-2.848-2.88-1.92-3.488-0.736q-2.432 0-4.512 1.216t-3.296 3.296-1.216 4.512z"></path>
          </g>
        </svg>
        <p className="text-[#086841] text-[43px] font-semibold font-pp-mori-semibold mt-0">SpendLens</p>
      </Link>
      <div className="flex">
        <button className="mr-8 cursor-pointer">Run Free AI Spend Audit</button>
        <button className="mr-8 cursor-pointer" onClick={() => scrollToSection("testimonials")}>Testimonials</button>
        <button className="mr-8 cursor-pointer" onClick={() => scrollToSection("HowItWorks")}>How It Work</button>
        <button className="mr-4 cursor-pointer" onClick={() => scrollToSection("FAQ")}>FAQ</button>
      </div>
    </div>
  </header>
})

Headers.displayName = "Headers";
