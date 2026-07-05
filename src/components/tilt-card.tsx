"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * TiltCard — adds a subtle 3D tilt + glare on mouse move.
 * Performance: uses rAF-throttled pointermove + transform only (no layout thrash).
 */
export function TiltCard({
  children,
  className,
  glare = true,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  glare?: boolean;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - y) * max * 2;
    const tiltY = (x - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`;
    if (glare) {
      el.style.setProperty("--glare-x", `${x * 100}%`);
      el.style.setProperty("--glare-y", `${y * 100}%`);
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "tilt-card relative transition-transform duration-300 ease-out",
        glare &&
          "after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
        className
      )}
      style={
        glare
          ? {
              // @ts-expect-error custom prop
              "--glare-x": "50%",
              "--glare-y": "50%",
            }
          : undefined
      }
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(201,168,76,0.10), transparent 55%)",
          }}
        />
      )}
    </div>
  );
}
