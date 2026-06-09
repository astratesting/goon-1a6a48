"use client";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import HeroPreviewCard from "./HeroPreviewCard";
import CursorSpotlight from "./CursorSpotlight";
import { getSiteContent } from "@/lib/content";
import { track } from "@/lib/analytics";
import { useEffect } from "react";

const content = getSiteContent();

export default function Hero() {
  useEffect(() => {
    track("view_hero");
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCTA = () => {
    track("click_cta", { source: "hero" });
    scrollTo("final-cta");
  };

  return (
    <section className="relative overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Indigo orb */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo rounded-full opacity-30 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <CursorSpotlight />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none">
            <Badge className="mb-6">
              <span className="inline-block w-1.5 h-1.5 bg-teal rounded-full mr-2" />
              {content.hero.eyebrow}
            </Badge>

            <h1 className="text-h1 text-text-primary mb-6">
              Describe your business.{" "}
              <br className="hidden sm:block" />
              Get a{" "}
              <span className="bg-gradient-to-r from-cyan to-teal bg-clip-text text-transparent">
                live page
              </span>{" "}
              in seconds.
            </h1>

            <p className="text-text-muted text-body max-w-2xl mb-8 mx-auto lg:mx-0">
              {content.hero.subhead}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <Button size="lg" onClick={handleCTA}>
                {content.hero.ctaPrimary}
                <svg className="ml-2 -mr-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Button>
              <Button variant="ghost" size="lg" onClick={() => scrollTo("demo")}>
                {content.hero.ctaSecondary}
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              {content.hero.trustBadges.map((badge, i) => (
                <span key={badge} className="flex items-center gap-4">
                  {i > 0 && <span className="text-text-dim text-xs">·</span>}
                  <span className="text-text-dim text-sm font-sans">{badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right: Preview card (desktop only) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <HeroPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
