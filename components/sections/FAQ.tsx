"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import AccordionRow from "@/components/faq/AccordionRow";
import { getSiteContent } from "@/lib/content";
import { track } from "@/lib/analytics";

const content = getSiteContent();

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    const next = openIndex === i ? null : i;
    setOpenIndex(next);
    if (next !== null) {
      track(`open_faq:${next}`);
    }
  };

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={content.faq.eyebrow}
            headline={content.faq.headline}
          />
        </Reveal>

        <div className="mt-12">
          {content.faq.items.map((item, i) => (
            <Reveal key={item.question} delay={i * 40}>
              <AccordionRow
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
