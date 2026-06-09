interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-mono text-mono-sm uppercase bg-ink-3 border border-ink-3 px-2.5 py-1 rounded-md text-text-dim ${className}`}
    >
      {children}
    </span>
  );
}
