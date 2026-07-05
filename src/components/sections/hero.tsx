"use client";

import Image from "next/image";
import { ArrowRight, Bot, Zap, ShieldCheck, Users, TrendingUp } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { site, stats } from "@/lib/site";

const iconMap = { Zap, ShieldCheck, Users, TrendingUp };

export function Hero({ onChatClick }: { onChatClick: () => void }) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Dubai skyline at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/60" />
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-20 left-[10%] w-px h-40 bg-gradient-to-b from-[#C9A84C]/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-20 right-[10%] w-px h-40 bg-gradient-to-t from-[#C9A84C]/20 to-transparent hidden lg:block" />

      {/* Ambient glow orbs */}
      <div className="glow-orb absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A84C]/[0.06] float-anim" />
      <div
        className="glow-orb absolute bottom-1/4 -right-32 w-96 h-96 bg-[#C9A84C]/[0.04] float-anim"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-24 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
              <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/[0.04] text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A84C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A84C]" />
                </span>
                UAE&apos;s Trusted Tech Partner
              </span>
            </div>

            <h1
              className="animate-fade-in-up delay-200 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-7"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              Premium Tech
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 gold-shimmer">
                  &amp; Digital Marketing
                </span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#C9A84C]/10 -skew-x-3" />
              </span>
              <br />
              <span className="text-gray-400">Across the UAE</span>
            </h1>

            <p
              className="animate-fade-in-up delay-400 text-[17px] text-gray-400 leading-relaxed mb-10 max-w-xl"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              Guaranteed fast delivery. We create affordable websites, custom web
              apps, and SEO campaigns built to attract both local Arab and
              international clients.
            </p>

            <div
              className="animate-fade-in-up delay-500 flex flex-wrap gap-4"
              style={{ opacity: 0, animationFillMode: "forwards" }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="magnetic-btn group inline-flex items-center gap-2.5 px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[14px] rounded-full hover:bg-[#E2CC7E] transition-all duration-300 shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:shadow-[0_0_40px_rgba(201,168,76,0.25)]"
              >
                Start Your Project
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <button
                onClick={onChatClick}
                className="magnetic-btn group inline-flex items-center gap-2.5 px-8 py-4 border border-[#C9A84C]/25 text-[#C9A84C] font-bold text-[14px] rounded-full hover:bg-[#C9A84C]/[0.06] hover:border-[#C9A84C]/40 transition-all duration-300"
              >
                <Bot className="w-[18px] h-[18px]" /> Chat with AI Agent
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <TiltCard
                  key={stat.label}
                  className={`glass-card rounded-2xl p-6 hover:border-[#C9A84C]/25 border border-transparent transition-all duration-500 animate-fade-in ${
                    i % 2 === 1 ? "mt-8" : ""
                  }`}
                >
                  <div className="w-11 h-11 bg-[#C9A84C]/[0.08] rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">
                    {stat.value}
                    <span className="text-[#C9A84C]">{stat.suffix}</span>
                  </h3>
                  <p className="text-[12px] text-gray-500 font-medium tracking-wide uppercase">
                    {stat.label}
                  </p>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Emirates strip */}
        <div
          className="mt-20 pt-8 border-t border-white/[0.04] animate-fade-in-up delay-700"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]/60">
              Serving
            </span>
            <div className="flex flex-wrap gap-6 text-[13px] text-gray-600">
              {site.emirates.map((em) => (
                <span
                  key={em}
                  className="hover:text-[#C9A84C] transition-colors duration-300 cursor-default flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 bg-[#C9A84C]/30 rounded-full" />
                  {em}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
