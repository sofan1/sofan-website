"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  MessageCircle,
  X,
  Minus,
  Send,
  Bot,
  User,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { useChat } from "@/lib/chat-store";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

const SOFIA_GREETING =
  "Hi, I'm Sofia — SOFAN's AI assistant. I help with web development, SEO, and digital growth across the UAE. How can I help you today?";

export function ChatWidget() {
  const { open, setOpen } = useChat();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [escalated, setEscalated] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "What services do you offer?",
    "How fast can you deliver?",
    "Can I get a quote?",
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greetedRef = useRef(false);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 400);
      // Show greeting on first open
      if (!greetedRef.current) {
        greetedRef.current = true;
        setMessages([{ role: "assistant", content: SOFIA_GREETING }]);
      }
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Msg = { role: "user", content: trimmed };
      const history = messages;
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId,
            history: history
              .filter((m) => m.role !== "system")
              .slice(-8)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setSessionId(data.sessionId);
        setEscalated(Boolean(data.escalated));
        if (Array.isArray(data.suggestions) && data.suggestions.length) {
          setSuggestions(data.suggestions);
        }
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.reply || "I'm here to help!" },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please reach us on WhatsApp at " +
              site.phoneDisplay +
              " or email " +
              site.email +
              ".",
          },
        ]);
        setEscalated(true);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, sessionId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating launcher button (visible when closed) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat with Sofia AI agent"
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#C9A84C] hover:bg-[#E2CC7E] flex items-center justify-center shadow-[0_4px_30px_rgba(201,168,76,0.4)] transition-all duration-500 group",
          open && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <span className="absolute inset-0 rounded-full bg-[#C9A84C] animate-ping opacity-20" />
        <MessageCircle className="w-7 h-7 text-[#0A0A0A] relative z-10 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full" />
        </span>
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#111] border border-[#C9A84C]/20 rounded-lg text-[12px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
          Chat with Sofia AI
        </span>
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "chat-widget fixed bottom-6 right-6 z-50 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)]",
          open ? "expanded" : "collapsed pointer-events-none"
        )}
        style={{
          width: open ? undefined : 60,
          height: open ? undefined : 60,
          borderRadius: open ? 20 : "50%",
        }}
        aria-hidden={!open}
      >
        {open && (
          <div className="absolute inset-0 bg-[#0A0A0A] rounded-[20px] flex flex-col border border-[#C9A84C]/15 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06] bg-[#0D0D0D]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="relative w-10 h-10 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/mnsofan-logo.png"
                      alt="Sofia"
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0D0D0D]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-white">
                      Sofia
                    </span>
                    <Sparkles className="w-3 h-3 text-[#C9A84C]" />
                  </div>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    Online · AI Agent · 24/7
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#C9A84C33 transparent" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2.5 animate-fade-in-up",
                    msg.role === "user" && "flex-row-reverse"
                  )}
                  style={{ animationDuration: "0.4s" }}
                >
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      msg.role === "assistant"
                        ? "bg-[#C9A84C]/10 border border-[#C9A84C]/30"
                        : "bg-white/[0.06] border border-white/10"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <Bot className="w-3.5 h-3.5 text-[#C9A84C]" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed",
                      msg.role === "assistant"
                        ? "bg-[#161616] border border-white/[0.05] text-gray-200 rounded-tl-sm"
                        : "bg-[#C9A84C] text-[#0A0A0A] font-medium rounded-tr-sm"
                    )}
                  >
                    {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, j) =>
                      /^https?:\/\//.test(part) ? (
                        <a
                          key={j}
                          href={part}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            msg.role === "assistant"
                              ? "text-[#C9A84C] underline break-all"
                              : "text-[#0A0A0A] underline break-all font-semibold"
                          }
                        >
                          {part}
                        </a>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-2.5 animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
                  <div className="w-7 h-7 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-[#C9A84C]" />
                  </div>
                  <div className="px-4 py-3.5 bg-[#161616] border border-white/[0.05] rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="typing-dot w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
                  </div>
                </div>
              )}

              {/* Escalation banner */}
              {escalated && !loading && (
                <div className="rounded-2xl border border-[#C9A84C]/25 bg-[#C9A84C]/[0.06] p-4 animate-fade-in-up" style={{ animationDuration: "0.4s" }}>
                  <p className="text-[12px] font-semibold text-[#C9A84C] mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Connect with our team
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={site.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#C9A84C] text-[#0A0A0A] font-semibold text-[12px] rounded-xl hover:bg-[#E2CC7E] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp {site.phoneDisplay}
                    </a>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={site.callLink}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#141414] border border-white/[0.08] text-gray-300 font-medium text-[11px] rounded-xl hover:border-[#C9A84C]/30 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call
                      </a>
                      <a
                        href={site.emailLink}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#141414] border border-white/[0.08] text-gray-300 font-medium text-[11px] rounded-xl hover:border-[#C9A84C]/30 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {!loading && suggestions.length > 0 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => {
                  const isWhatsApp = /whatsapp/i.test(s);
                  return (
                    <button
                      key={s}
                      onClick={() =>
                        isWhatsApp
                          ? window.open(site.whatsappLink, "_blank")
                          : sendMessage(s)
                      }
                      className="px-3 py-1.5 bg-[#141414] border border-[#C9A84C]/15 text-[#C9A84C] text-[11px] font-medium rounded-full hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-all duration-200"
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-3 border-t border-white/[0.06] bg-[#0D0D0D]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3.5 py-2.5 bg-[#141414] border border-white/[0.06] rounded-xl text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/30 transition-all duration-200"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 flex-shrink-0 bg-[#C9A84C] text-[#0A0A0A] rounded-xl flex items-center justify-center hover:bg-[#E2CC7E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
