import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Goon

> Describe your business. Get a live page in seconds.

Goon is an AI-powered landing page generator. You describe your business in plain English, and Goon generates a complete, conversion-ready landing page — including copy, layout, and design — in under ten seconds.

## Features

- One-line generation: describe your business, get a full page
- Conversion-tested templates with proven landing page anatomy
- Live editor for real-time tweaks
- Brand controls for colors, fonts, and voice
- One-click publish to goon.page subdomain or custom domain
- Built-in analytics dashboard

## Pricing

- Starter (Free): 1 page, goon.page subdomain, Goon branding
- Pro ($24/mo): unlimited pages, custom domain, no branding, analytics

## Links

- Website: https://goon.page
- Waitlist: https://goon.page/#final-cta
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
