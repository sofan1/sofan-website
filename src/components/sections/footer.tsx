"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { site, services, navLinks } from "@/lib/site";

export function Footer({ onChatClick }: { onChatClick: () => void }) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0A0A0A] pt-20 pb-10 border-t border-white/[0.03] mt-auto">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#C9A84C]/[0.02] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full border-2 border-[#C9A84C]/30 overflow-hidden bg-[#0A0A0A] flex-shrink-0">
                <Image
                  src="/mnsofan-logo.png"
                  alt="MN SOFAN logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <span className="block text-[13px] font-bold tracking-[0.15em] text-white">
                  {site.brandFull}
                </span>
                <span className="block text-[8px] font-semibold tracking-[0.3em] text-[#C9A84C]/50 uppercase">
                  {site.tagline}
                </span>
              </div>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Premium tech development and digital marketing across the UAE. Fast
              delivery, affordable pricing, real results.
            </p>
            <button
              onClick={onChatClick}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/15 text-[#C9A84C] font-semibold text-[12px] rounded-full hover:bg-[#C9A84C]/15 transition-all duration-300"
            >
              Chat with Sofia AI
            </button>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]/60 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo("#services");
                    }}
                    className="text-[13px] text-gray-500 hover:text-[#C9A84C] transition-colors duration-300"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]/60 mb-5">
              Locations
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-[13px] text-gray-400">
                  Dubai <span className="text-[#C9A84C]/50">(HQ)</span>
                </span>
              </li>
              {site.emirates.slice(1).map((em) => (
                <li key={em}>
                  <span className="text-[13px] text-gray-500 hover:text-[#C9A84C] transition-colors duration-300 cursor-default">
                    {em}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]/60 mb-5">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={site.callLink}
                  className="flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#C9A84C] transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-[#C9A84C]/60 flex-shrink-0" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.emailLink}
                  className="flex items-center gap-3 text-[13px] text-gray-500 hover:text-[#C9A84C] transition-colors duration-300 break-all"
                >
                  <Mail className="w-4 h-4 text-[#C9A84C]/60 flex-shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[13px] text-gray-500">
                <MapPin className="w-4 h-4 text-[#C9A84C]/60 flex-shrink-0 mt-0.5" />
                <span>
                  {site.addressLine1}
                  <br />
                  {site.addressLine2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-600 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {site.brandFull} {site.tagline}.
            All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-pulse" />
            <p className="text-[12px] text-gray-600">
              Fully compliant with UAE regulations
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
