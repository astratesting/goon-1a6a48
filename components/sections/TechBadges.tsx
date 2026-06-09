import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function TechBadges() {
  return (
    <section className="py-12 border-y border-ink-3/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-text-dim text-sm font-sans">{content.techBadges.label}</span>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {content.techBadges.badges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-mono-sm uppercase bg-ink-3 border border-ink-3 px-3 py-1.5 rounded-md text-text-dim"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
