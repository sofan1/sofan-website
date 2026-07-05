"use client";

import { useChat } from "@/lib/chat-store";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Locations } from "@/components/sections/locations";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ChatWidget } from "@/components/chat-widget";

export default function Home() {
  const openChat = () => useChat.getState().setOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <ScrollProgress />
      <CustomCursor />
      <Navbar onQuoteClick={openChat} />

      <main className="flex-1">
        <Hero onChatClick={openChat} />
        <Services />
        <WhyUs />
        <Locations />
        <Process />
        <Contact onChatClick={openChat} />
      </main>

      <Footer onChatClick={openChat} />
      <ChatWidget />
    </div>
  );
}
