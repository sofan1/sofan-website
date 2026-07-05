"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, navLinks } from "@/lib/site";

export function Navbar({ onQuoteClick }: { onQuoteClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#hero");
            }}
            className="group relative flex items-center gap-3.5"
          >
            <div className="relative w-[52px] h-[52px] rounded-full border-2 border-[#C9A84C]/30 group-hover:border-[#C9A84C] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(201,168,76,0.3)] flex-shrink-0 overflow-hidden bg-[#0A0A0A]">
              <Image
                src="/mnsofan-logo.png"
                alt="MN SOFAN logo"
                fill
                sizes="52px"
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block text-[13px] font-bold tracking-[0.15em] text-white group-hover:text-[#C9A84C] transition-colors duration-300">
                {site.brandFull}
              </span>
              <span className="block text-[8px] font-semibold tracking-[0.3em] text-[#C9A84C]/50 uppercase">
                {site.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="nav-link relative px-4 py-2 text-[13px] font-medium text-gray-400 hover:text-[#C9A84C] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onQuoteClick}
              className="magnetic-btn ml-4 px-6 py-2.5 bg-[#C9A84C] text-[#0A0A0A] font-bold text-[13px] rounded-full hover:bg-[#E2CC7E] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(201,168,76,0.25)]"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-gray-300 hover:text-[#C9A84C] transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-[#0A0A0A]/98 backdrop-blur-xl z-40 flex items-center justify-center transition-all duration-500",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="text-center space-y-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.href);
              }}
              className="block text-3xl font-display font-bold text-white hover:text-[#C9A84C] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onQuoteClick();
            }}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0A0A0A] font-bold rounded-full text-lg"
          >
            Get Free Quote <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
