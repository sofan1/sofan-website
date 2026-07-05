"use client";

import {
  Zap,
  Wallet,
  Languages,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { whyFeatures } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Wallet,
  Languages,
  ShieldCheck,
};

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 bg-[#0D0D0D]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">
            Why {""}MN Sofan
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight mb-5">
            Real Results,
            <br />
            <span className="text-gold-gradient">Without Breaking</span> the Bank
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We combine premium quality with affordable pricing. Every project
            complies with UAE regulations while attracting both local Arab and
            international clients.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {whyFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <Reveal key={feature.title} delay={i * 80}>
                <div className="group h-full bg-[#111]/80 border border-white/[0.04] rounded-2xl p-7 transition-all duration-500 hover:border-[#C9A84C]/25 hover:bg-[#141414] hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/10 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#C9A84C]">
                    <Icon className="w-5 h-5 text-[#C9A84C] transition-colors duration-500 group-hover:text-[#0A0A0A]" />
                  </div>
                  <h3 className="text-[16px] font-bold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Rating banner */}
        <Reveal>
          <div className="glass-card rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-[#C9A84C]/10">
            <div className="flex items-center gap-5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-[#C9A84C] text-[#C9A84C]"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">
                  5.0{" "}
                  <span className="text-[#C9A84C] text-lg font-normal">
                    / 5.0
                  </span>
                </div>
                <p className="text-[13px] text-gray-500">
                  Trusted by 500+ businesses across UAE
                </p>
              </div>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="magnetic-btn px-7 py-3.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[13px] rounded-full hover:bg-[#E2CC7E] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(201,168,76,0.25)] whitespace-nowrap"
            >
              Join 500+ Happy Clients
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
