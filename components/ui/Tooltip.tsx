"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  visible: boolean;
  onClose?: () => void;
}

export default function Tooltip({ children, content, visible, onClose }: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (visible && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <div ref={ref} className="relative inline-block">
      {children}
      {visible && (
        <div
          role="tooltip"
          className="absolute z-50 px-3 py-2 text-sm font-sans text-text-primary bg-ink-2 border border-ink-3 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "8px",
          }}
        >
          {content}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #1a1a20",
            }}
          />
        </div>
      )}
    </div>
  );
}
