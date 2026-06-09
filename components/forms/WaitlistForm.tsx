"use client";

import { useState, useRef, useTransition, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { getSiteContent } from "@/lib/content";
import { track } from "@/lib/analytics";

const content = getSiteContent();

type FormState = "idle" | "submitting" | "success" | "error" | "duplicate";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [submittedEmail, setSubmittedEmail] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [source] = useState(() => {
    if (typeof window === "undefined") return "final_cta";
    const hash = window.location.hash;
    if (hash === "#pricing") return "pricing";
    return "final_cta";
  });

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setError("Email is required");
      return false;
    }
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleBlur = () => {
    if (email) validateEmail(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypotRef.current?.value) {
      setState("success");
      return;
    }

    if (!validateEmail(email)) return;

    setState("submitting");

    startTransition(async () => {
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            source,
            referrer: document.referrer?.slice(0, 500) || undefined,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 429) {
            setError("Too many requests. Please try again later.");
          } else {
            setError(data.error || "Something went wrong. Please try again.");
          }
          setState("error");
          track("submit_waitlist_error", { status: res.status });
          return;
        }

        const data = await res.json();
        setSubmittedEmail(email);
        setState(data.status === "existing" ? "duplicate" : "success");
        track("submit_waitlist_success");
      } catch {
        setError("Couldn't reach the server. Try again?");
        setState("error");
      }
    });
  };

  // Success state
  if (state === "success" || state === "duplicate") {
    return (
      <div className="bg-ink-2 border border-teal/40 rounded-xl p-6 max-w-md mx-auto text-center">
        <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center bg-teal/10 rounded-full">
          <svg
            className="w-5 h-5 text-teal"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-text-primary font-medium mb-1">
          {state === "duplicate"
            ? content.finalCTA.successDuplicate
            : content.finalCTA.successHeading}
        </p>
        <p className="text-text-muted text-sm">
          {state === "duplicate"
            ? "We already have your email on file."
            : content.finalCTA.successMessage}
        </p>
        {submittedEmail && (
          <p className="text-text-dim text-xs mt-2 font-mono">{submittedEmail}</p>
        )}
      </div>
    );
  }

  // Form state
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {/* Honeypot */}
      <input
        ref={honeypotRef}
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            onBlur={handleBlur}
            placeholder={content.finalCTA.emailPlaceholder}
            className={`w-full px-4 py-3 bg-ink-2 border rounded-xl text-text-primary placeholder:text-text-dim font-sans text-body focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors ${
              error ? "border-red-500" : "border-ink-3"
            }`}
            aria-label="Email address"
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
            disabled={state === "submitting"}
          />
        </div>
        <Button
          type="submit"
          disabled={state === "submitting"}
          className="sm:w-auto w-full"
        >
          {state === "submitting" ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Joining…
            </>
          ) : (
            content.finalCTA.button
          )}
        </Button>
      </div>

      {error && (
        <p id="email-error" className="text-red-400 text-sm mt-2" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
