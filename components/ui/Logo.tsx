interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <a href="/" className={`inline-flex items-center gap-1.5 font-mono text-lg font-medium text-text-primary ${className}`}>
      <span className="inline-block w-2 h-2 bg-teal rounded-sm" />
      Goon
    </a>
  );
}
