import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.json",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          2: "#111114",
          3: "#1a1a20",
        },
        indigo: {
          DEFAULT: "#4f46e5",
        },
        cyan: {
          DEFAULT: "#06b6d4",
        },
        teal: {
          DEFAULT: "#14b8a6",
        },
        "text-primary": "#f5f5f7",
        "text-muted": "#a1a1aa",
        "text-dim": "#71717a",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "h1": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["clamp(1.875rem, 3vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "h3": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "mono-sm": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },
      maxWidth: {
        "prose": "65ch",
        "6xl": "72rem",
        "3xl": "48rem",
      },
      spacing: {
        "section": "6rem",
        "section-md": "8rem",
      },
      borderRadius: {
        "xl": "0.75rem",
      },
      boxShadow: {
        "card-hover": "0 0 0 1px rgba(20,184,166,0.3)",
        "cta-glow": "0 0 30px -5px rgba(20,184,166,0.25)",
        "pricing-glow": "0 0 60px -15px rgba(20,184,166,0.4)",
      },
      transitionTimingFunction: {
        "bounce-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "150": "150ms",
        "200": "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
