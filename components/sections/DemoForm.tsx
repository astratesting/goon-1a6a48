"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function DemoForm() {
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show tooltip
    setShowTooltip(true);

    // Clear input
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // Scroll to waitlist after 600ms
    setTimeout(() => {
      const el = document.getElementById("final-cta");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);

    // Focus email field in waitlist section
    setTimeout(() => {
      const emailInput = document.querySelector<HTMLInputElement>(
        '#final-cta input[type="email"]'
      );
      emailInput?.focus();
    }, 1200);

    // Hide tooltip after 3s
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <div className="relative max-w-lg mx-auto mt-8">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={content.demo.formPlaceholder}
          className="flex-1 px-4 py-3 bg-ink-2 border border-ink-3 rounded-xl text-text-primary placeholder:text-text-dim font-sans text-body focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
          aria-label="Describe your business"
        />
        <div className="relative">
          <Button type="submit" size="md">
            {content.demo.formButton}
          </Button>
          {showTooltip && (
            <div
              role="tooltip"
              className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-sm font-sans text-text-primary bg-ink-2 border border-ink-3 rounded-lg shadow-lg whitespace-nowrap"
            >
              {content.demo.demoTooltip}
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
      </form>
    </div>
  );
}
