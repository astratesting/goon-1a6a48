import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import WaitlistForm from "@/components/forms/WaitlistForm";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative py-24 md:py-32 overflow-hidden">
      {/* Teal glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal rounded-full opacity-10 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <Badge className="mb-6">{content.finalCTA.eyebrow}</Badge>
          <h2 className="text-h2 text-text-primary mb-4">
            {content.finalCTA.headline}
          </h2>
          <p className="text-text-muted text-body mb-10">
            {content.finalCTA.subhead}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <WaitlistForm />
        </Reveal>

        <Reveal delay={200}>
          <p className="text-text-dim text-sm mt-6">
            {content.finalCTA.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
