"use client";

import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function DemoTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const reduced = useReducedMotion();
  const hasAnimated = useRef(false);

  const lines = content.demo.terminalLines;

  useEffect(() => {
    if (reduced) {
      setVisibleLines(lines.length);
      setDisplayedTexts(lines.map((l) => l.text));
      return;
    }

    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let lineIndex = 0;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (lineIndex >= lines.length) {
        setIsTyping(false);
        return;
      }

      const currentLine = lines[lineIndex];

      if (charIndex === 0) {
        setVisibleLines(lineIndex + 1);
        setDisplayedTexts((prev) => {
          const next = [...prev];
          next[lineIndex] = "";
          return next;
        });
      }

      if (charIndex <= currentLine.text.length) {
        setDisplayedTexts((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.text.slice(0, charIndex);
          return next;
        });
        charIndex++;
        setIsTyping(true);
        timer = setTimeout(typeNext, 20 + Math.random() * 15);
      } else {
        lineIndex++;
        charIndex = 0;
        timer = setTimeout(typeNext, 200);
      }
    };

    timer = setTimeout(typeNext, 400);
    return () => clearTimeout(timer);
  }, [reduced, replayKey, lines]);

  const handleClick = () => {
    if (reduced) return;
    setVisibleLines(0);
    setDisplayedTexts([]);
    setIsTyping(true);
    hasAnimated.current = false;
    setReplayKey((k) => k + 1);
  };

  return (
    <div
      className="bg-ink-2 border border-ink-3 rounded-xl overflow-hidden cursor-pointer max-w-2xl mx-auto"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Click to replay terminal animation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-text-dim/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-text-dim/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-text-dim/30" />
        </div>
        <span className="font-mono text-xs text-text-dim">goon — generate</span>
      </div>

      {/* Terminal content */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[240px]">
        {lines.map((line, i) => {
          if (i >= visibleLines) return null;

          const prefixColor =
            line.prefix === ">"
              ? "text-teal"
              : line.prefix === "✓"
              ? "text-teal"
              : "text-cyan";

          return (
            <div key={`${replayKey}-${i}`} className="flex gap-2 mb-1.5">
              <span className={prefixColor}>{line.prefix}</span>
              <span className="text-text-primary">
                {displayedTexts[i] ?? ""}
                {isTyping && i === visibleLines - 1 && (
                  <span className="inline-block w-2 h-4 bg-teal ml-0.5 animate-pulse" />
                )}
              </span>
            </div>
          );
        })}
        {!isTyping && visibleLines >= lines.length && (
          <span className="inline-block w-2 h-4 bg-teal animate-pulse mt-1" />
        )}
      </div>
    </div>
  );
}
