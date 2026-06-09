import Logo from "@/components/ui/Logo";
import { getSiteContent } from "@/lib/content";

const content = getSiteContent();

export default function Footer() {
  return (
    <footer className="border-t border-ink-3 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Left: Logo + tagline */}
          <div className="max-w-xs">
            <Logo className="mb-3" />
            <p className="text-text-muted text-sm">{content.footer.tagline}</p>
          </div>

          {/* Right: Link groups */}
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {content.footer.groups.map((group) => (
              <div key={group.heading}>
                <h4 className="font-mono text-mono-sm uppercase text-text-dim mb-4">
                  {group.heading}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-text-muted text-sm hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-ink-3">
          <span className="text-text-dim text-sm">{content.footer.copyright}</span>
          <span className="text-text-dim text-sm">{content.footer.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
