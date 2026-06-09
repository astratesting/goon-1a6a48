"use client";

interface AccordionRowProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionRow({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionRowProps) {
  return (
    <div className="border-b border-ink-3 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-lg group"
        aria-expanded={isOpen}
      >
        <h3 className="text-h3 text-text-primary pr-4 group-hover:text-teal transition-colors duration-150">
          {question}
        </h3>
        <span
          className={`shrink-0 w-5 h-5 flex items-center justify-center text-text-dim transition-transform duration-200 ease-bounce-out ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-all duration-200 ease-bounce-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <p className="text-text-muted text-body pb-5 pr-8 max-w-prose">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
