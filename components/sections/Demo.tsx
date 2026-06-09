import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import DemoTerminal from "./DemoTerminal";
import DemoForm from "./DemoForm";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function Demo() {
  return (
    <section id="demo" className="relative py-24 md:py-32 overflow-hidden">
      {/* Indigo glow orb */}
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo rounded-full opacity-20 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.demo.eyebrow}
            headline={content.demo.headline}
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12">
            <DemoTerminal />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <DemoForm />
        </Reveal>
      </div>
    </section>
  );
}
