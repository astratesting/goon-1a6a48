import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.pricing.eyebrow}
            headline={content.pricing.headline}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-3xl mx-auto">
          {content.pricing.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <Card
                hover={false}
                className={`relative p-8 h-full flex flex-col ${
                  plan.popular
                    ? "ring-1 ring-teal/40 shadow-pricing-glow"
                    : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-mono-sm uppercase bg-teal text-ink px-3 py-1 rounded-md font-medium">
                    Most popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-h3 text-text-primary mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text-primary tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-text-dim text-sm font-sans">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-text-muted text-body"
                    >
                      <svg
                        className="w-4 h-4 text-teal mt-0.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a href="#final-cta">
                  <Button
                    variant={plan.popular ? "primary" : "ghost"}
                    className="w-full"
                  >
                    {content.pricing.cta}
                  </Button>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p className="text-text-muted text-sm text-center mt-8 max-w-prose mx-auto">
            {content.pricing.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
