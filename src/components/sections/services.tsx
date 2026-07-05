"use client";

import {
  Globe,
  Code2,
  Search,
  Megaphone,
  Smartphone,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Code2,
  Search,
  Megaphone,
  Smartphone,
  BarChart3,
};

export function Services() {
  return (
    <section id="services" className="relative py-28 bg-[#0A0A0A]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9A84C]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">
            Our Services
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight mb-5">
            Everything You Need to
            <br />
            <span className="text-gold-gradient">Dominate Digitally</span>
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From stunning websites to powerful SEO — high-quality tech solutions
            that fit your budget and drive real results.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.title} delay={i * 80}>
                <div className="service-card group relative bg-[#111]/80 border border-white/[0.04] rounded-2xl p-8 transition-all duration-500 hover:border-[#C9A84C]/25 hover:bg-[#141414] h-full">
                  <div className="w-14 h-14 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/10 rounded-2xl flex items-center justify-center mb-7 transition-all duration-500 group-hover:bg-[#C9A84C] group-hover:border-[#C9A84C] group-hover:rotate-3">
                    <Icon className="w-6 h-6 text-[#C9A84C] transition-colors duration-500 group-hover:text-[#0A0A0A]" />
                  </div>
                  <h3 className="text-[17px] font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#C9A84C]/[0.05] border border-[#C9A84C]/10 rounded-full text-[10px] font-medium text-[#C9A84C] tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
