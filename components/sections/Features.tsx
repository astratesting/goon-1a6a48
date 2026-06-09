import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Icon from "@/components/ui/Icon";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.features.eyebrow}
            headline={content.features.headline}
            subhead={content.features.subhead}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {content.features.items.map((feature, i) => (
            <Reveal key={feature.label} delay={i * 50}>
              <Card className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Icon
                      name={feature.icon}
                      size={24}
                      className="text-teal"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-h3 text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-text-muted text-body mb-4 flex-1">{feature.description}</p>
                  <span className="font-mono text-mono-sm text-text-dim uppercase">
                    {feature.label}
                  </span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
