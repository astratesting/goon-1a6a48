import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.howItWorks.eyebrow}
            headline={content.howItWorks.headline}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {content.howItWorks.steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div className="bg-ink-2 border border-ink-3 rounded-xl p-8 h-full transition-all duration-150 hover:border-teal/30 hover:shadow-card-hover">
                <span className="block font-mono text-7xl lg:text-8xl font-bold text-teal leading-none mb-4 select-none">
                  {step.num}
                </span>
                <div className="w-full h-px bg-ink-3 mb-6" />
                <h3 className="text-h3 text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-muted text-body">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
