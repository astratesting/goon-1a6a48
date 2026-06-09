"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    // Detect touch devices
    if ("ontouchstart" in window) return;

    let raf: number;
    const handleMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      });
    };

    el.addEventListener("pointermove", handleMove);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(20,184,166,0.08), transparent 60%)",
        }}
      />
    </div>
  );
}
