"use client";

export default function HeroPreviewCard() {
  return (
    <div className="relative w-full max-w-md transform -rotate-3 hover:rotate-0 transition-transform duration-300 ease-bounce-out">
      {/* Glow behind card */}
      <div className="absolute inset-0 bg-teal/10 blur-3xl rounded-3xl scale-110" />

      <div className="relative bg-ink-2 border border-ink-3 rounded-xl overflow-hidden shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-text-dim/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-text-dim/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-text-dim/40" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[10px] font-mono text-text-dim bg-ink-3 px-3 py-0.5 rounded-md">
              goon.page/your-startup
            </span>
          </div>
          <div className="w-12" />
        </div>

        {/* Fake page content */}
        <div className="p-6 space-y-4">
          {/* Nav */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-teal rounded-sm" />
              <span className="text-[10px] font-mono text-text-muted">QuietCode</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[9px] text-text-dim">Features</span>
              <span className="text-[9px] text-text-dim">Pricing</span>
              <span className="text-[9px] text-text-dim">Docs</span>
            </div>
          </div>

          {/* Hero */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-text-primary leading-tight">
              Notes for engineers
              <br />
              who hate markdown.
            </h2>
            <p className="text-[10px] text-text-muted leading-relaxed">
              Write in plain text. Get structured docs.
              <br />
              No syntax, no friction.
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-2">
            <span className="inline-block px-3 py-1 bg-teal text-ink text-[9px] font-medium rounded-md">
              Get started free
            </span>
            <span className="inline-block px-3 py-1 border border-ink-3 text-text-muted text-[9px] rounded-md">
              Learn more
            </span>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {["Instant search", "Version history", "API access", "Team sharing"].map(
              (f) => (
                <div
                  key={f}
                  className="bg-ink-3/50 rounded-md px-2.5 py-1.5"
                >
                  <span className="text-[9px] text-text-dim">{f}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
