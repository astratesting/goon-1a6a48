"use client";

import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-ink">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-h1 text-text-primary mb-4">Something went wrong</h1>
        <p className="text-text-muted text-body mb-8">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="ghost" onClick={reset}>
            Try again
          </Button>
          <a href="/">
            <Button>Go home</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
