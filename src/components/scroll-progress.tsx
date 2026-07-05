"use client";

import { useEffect, useState } from "react";

/**
 * ScrollProgress — a thin gold gradient bar pinned to the top of the viewport
 * that fills as the user scrolls down the page.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[100] transition-[width] duration-150 ease-out"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #C9A84C, #E2CC7E, #C9A84C)",
        boxShadow: "0 0 10px rgba(201,168,76,0.5)",
      }}
      aria-hidden
    />
  );
}
