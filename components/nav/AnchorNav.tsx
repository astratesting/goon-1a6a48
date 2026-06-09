"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function AnchorNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const sectionIds = useRef<string[]>([]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      setMobileOpen(false);
    },
    [reduced]
  );

  useEffect(() => {
    const ids = content.nav.links.map((l) => l.href.replace("#", ""));
    sectionIds.current = ids;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md bg-ink/80 border-b border-ink-3/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {content.nav.links.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(id)}
                  className={`relative text-sm font-sans transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-teal" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => scrollTo("final-cta")}
            >
              {content.nav.cta}
            </Button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-3/60 bg-ink/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {content.nav.links.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left px-3 py-2 text-sm text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg"
                >
                  {link.label}
                </button>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2"
              onClick={() => scrollTo("final-cta")}
            >
              {content.nav.cta}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
