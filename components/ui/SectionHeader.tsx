import Badge from "./Badge";

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  subhead?: string;
  className?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  eyebrow,
  headline,
  subhead,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const alignClasses =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClasses} ${className}`}>
      <Badge className="mb-4">{eyebrow}</Badge>
      <h2 className="text-h2 text-text-primary mb-4">{headline}</h2>
      {subhead && (
        <p className="text-text-muted text-body max-w-prose mx-auto">{subhead}</p>
      )}
    </div>
  );
}
