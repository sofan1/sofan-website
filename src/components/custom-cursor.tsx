"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — a premium two-element cursor (dot + trailing ring) for desktop.
 * Grows when hovering interactive elements. Disabled on touch / small screens.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on large screens with a fine pointer.
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, input, textarea, select, [role='button']")
      ) {
        ring.style.width = "56px";
        ring.style.height = "56px";
        ring.style.borderColor = "rgba(201,168,76,0.8)";
        ring.style.backgroundColor = "rgba(201,168,76,0.06)";
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, input, textarea, select, [role='button']")
      ) {
        ring.style.width = "40px";
        ring.style.height = "40px";
        ring.style.borderColor = "rgba(201,168,76,0.4)";
        ring.style.backgroundColor = "transparent";
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#C9A84C] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#C9A84C]/40 rounded-full pointer-events-none z-[9998] hidden lg:block transition-[width,height,border-color,background-color] duration-200"
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden
      />
    </>
  );
}
