"use client";

import { MapPin, Building2, Globe2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { site } from "@/lib/site";

const locations = [
  {
    icon: Building2,
    label: "Main Hub",
    city: "Dubai",
    note: "Fastest delivery • Full service",
  },
  {
    icon: MapPin,
    label: "Capital Region",
    city: "Abu Dhabi",
    note: "Enterprise solutions",
  },
  {
    icon: Globe2,
    label: "Nationwide",
    city: "All Emirates",
    note: "Sharjah • Ajman • RAK • Fujairah • UAQ",
  },
];

export function Locations() {
  return (
    <section id="locations" className="relative py-28 bg-[#0A0A0A]">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">
            Our Reach
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight mb-5">
            Serving All
            <br />
            <span className="text-gold-gradient">Seven Emirates</span>
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From the towers of Dubai to the shores of Fujairah — premium tech
            solutions wherever your business operates.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Map + HQ card */}
          <Reveal>
            <div className="glass-card rounded-3xl p-2 border-[#C9A84C]/10 overflow-hidden">
              <div className="relative w-full h-[360px] rounded-2xl overflow-hidden">
                <iframe
                  title="SOFAN office location — Hor Al Anz, Deira, Dubai"
                  src={site.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C9A84C]/[0.08] border border-[#C9A84C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white">
                    {site.brandFull} HQ
                  </h4>
                  <p className="text-[12px] text-gray-500">{site.tagline}</p>
                  <p className="text-[12px] text-[#C9A84C]/80 mt-1">
                    {site.addressLine1} — {site.addressLine2}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Location cards */}
          <div className="grid gap-4">
            {locations.map((loc, i) => (
              <Reveal key={loc.city} delay={i * 100}>
                <TiltCard
                  max={5}
                  className="group bg-[#111]/80 border border-white/[0.04] rounded-2xl p-6 hover:border-[#C9A84C]/25 transition-all duration-500"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/10 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#C9A84C] flex-shrink-0">
                      <loc.icon className="w-6 h-6 text-[#C9A84C] transition-colors duration-500 group-hover:text-[#0A0A0A]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A84C]/60 mb-1">
                        {loc.label}
                      </div>
                      <h3 className="text-[20px] font-bold text-white tracking-tight">
                        {loc.city}
                      </h3>
                      <p className="text-[13px] text-gray-500 mt-0.5">
                        {loc.note}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
