"use client";

import { useState } from "react";
import {
  Bot,
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  Phone,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";
import { useToast } from "@/hooks/use-toast";
import { site, serviceOptions, budgetOptions } from "@/lib/site";

export function Contact({ onChatClick }: { onChatClick: () => void }) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing details",
        description: "Please fill in your name, email, and project details.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      toast({
        title: "Inquiry submitted!",
        description: "Our team will get back to you within 2 hours.",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description:
          "Please try again or reach us on WhatsApp at +971 55 207 9989.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-[#141414] border border-white/[0.06] rounded-xl text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/40 focus:bg-[#181818] transition-all duration-200";
  const labelClass =
    "block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-2.5";

  const contactCards = [
    {
      icon: Bot,
      title: "AI Chat Agent",
      sub: "24/7 smart assistance",
      action: "Talk to AI Agent",
      onClick: onChatClick,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      sub: "Fast response, 24/7",
      action: "Connect via Agent",
      href: site.whatsappLink,
      external: true,
    },
    {
      icon: Phone,
      title: "Call Us",
      sub: site.phoneDisplay,
      action: "Call Now",
      href: site.callLink,
    },
    {
      icon: Mail,
      title: "Email",
      sub: site.email,
      action: "Send Email",
      href: site.emailLink,
    },
  ];

  return (
    <section id="contact" className="relative py-28 bg-[#0A0A0A]">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A84C]/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/15 bg-[#C9A84C]/[0.03] text-[#C9A84C] text-[10px] font-bold tracking-[0.25em] uppercase mb-6">
            Get Started
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight mb-5">
            Let&apos;s Build Something
            <br />
            <span className="text-gold-gradient">Extraordinary</span>
          </h2>
          <p className="text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Fill out the form or chat with our AI agent — available 24/7 to help
            you get started.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-7 sm:p-9 space-y-5 border-[#C9A84C]/10"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                    placeholder="+971 ..."
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="service">
                    Service
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="message">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={inputClass + " resize-none"}
                  placeholder="Tell us about your project..."
                />
              </div>

              <div>
                <label className={labelClass}>Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => update("budget", b)}
                      className={
                        "px-4 py-2 rounded-full text-[12px] font-medium border transition-all duration-200 " +
                        (form.budget === b
                          ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]"
                          : "bg-[#141414] text-gray-400 border-white/[0.06] hover:border-[#C9A84C]/30 hover:text-[#C9A84C]")
                      }
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="magnetic-btn w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[14px] rounded-xl hover:bg-[#E2CC7E] transition-all duration-300 shadow-[0_0_30px_rgba(201,168,76,0.15)] hover:shadow-[0_0_40px_rgba(201,168,76,0.25)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-[18px] h-[18px] animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry <Send className="w-[18px] h-[18px]" />
                  </>
                )}
              </button>

              {submitted && (
                <div className="mt-2 p-5 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-2xl text-emerald-400 text-center animate-fade-in-up">
                  <CheckCircle2 className="w-6 h-6 inline-block mb-2" />
                  <p className="font-semibold text-[15px]">
                    Thank you! We&apos;ll get back to you within 2 hours.
                  </p>
                  <p className="text-[13px] text-emerald-400/60 mt-1">
                    Our AI agent will follow up with you shortly.
                  </p>
                </div>
              )}
            </form>
          </Reveal>

          {/* Contact cards */}
          <div className="space-y-4">
            {contactCards.map((card, i) => {
              const inner = (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#C9A84C] flex-shrink-0">
                      <card.icon className="w-5 h-5 text-[#C9A84C] transition-colors duration-500 group-hover:text-[#0A0A0A]" />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-white">
                        {card.title}
                      </h4>
                      <p className="text-[12px] text-gray-500">{card.sub}</p>
                    </div>
                  </div>
                  <span className="block w-full text-center px-5 py-3 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/15 text-[#C9A84C] font-semibold text-[13px] rounded-xl group-hover:bg-[#C9A84C]/15 group-hover:border-[#C9A84C]/25 transition-all duration-300">
                    {card.action}
                  </span>
                </>
              );

              return (
                <Reveal key={card.title} delay={i * 80}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.external ? "_blank" : undefined}
                      rel={card.external ? "noopener noreferrer" : undefined}
                      className="block group bg-[#111]/80 border border-white/[0.04] rounded-2xl p-6 transition-all duration-500 hover:border-[#C9A84C]/20"
                    >
                      {inner}
                    </a>
                  ) : (
                    <button
                      onClick={card.onClick}
                      className="block w-full text-left group bg-[#111]/80 border border-white/[0.04] rounded-2xl p-6 transition-all duration-500 hover:border-[#C9A84C]/20"
                    >
                      {inner}
                    </button>
                  )}
                </Reveal>
              );
            })}

            {/* Hours + Office */}
            <Reveal delay={320}>
              <TiltCard
                max={4}
                className="group bg-[#111]/80 border border-white/[0.04] rounded-2xl p-6 hover:border-[#C9A84C]/20 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#C9A84C] flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#C9A84C] transition-colors duration-500 group-hover:text-[#0A0A0A]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] font-bold text-white mb-1">
                      Working Hours
                    </h4>
                    <p className="text-[13px] text-gray-400">
                      {site.officeHours}
                    </p>
                    <p className="text-[12px] text-gray-500">
                      {site.weekendHours}
                    </p>
                    <p className="text-[12px] text-[#C9A84C]/80 mt-1.5">
                      {site.liveChatHours}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={400}>
              <div className="bg-[#111]/80 border border-white/[0.04] rounded-2xl p-6 flex items-start gap-4">
                <div className="w-11 h-11 bg-[#C9A84C]/[0.06] border border-[#C9A84C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white mb-1">
                    Our Office
                  </h4>
                  <p className="text-[13px] text-gray-400">{site.addressLine1}</p>
                  <p className="text-[13px] text-gray-400">
                    {site.addressLine2}, {site.addressCountry}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
