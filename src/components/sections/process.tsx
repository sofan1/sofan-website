"use client";

import { Reveal } from "@/components/reveal";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="relative py-28 bg-[#0D0D0D]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">
            How It Works
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight mb-5">
            From Idea to Launch
            <br />
            <span className="text-gold-gradient">in 4 Simple Steps</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[68px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="group relative text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-[#C9A84C]/[0.06] border border-[#C9A84C]/15 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#C9A84C]/[0.1]" />
                  <div className="absolute inset-2 rounded-full bg-[#0D0D0D] border border-white/[0.04]" />
                  <span className="relative font-display text-2xl font-bold text-gold-gradient">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-[17px] font-bold text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed max-w-[260px] mx-auto">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
