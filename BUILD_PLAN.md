# Goon — Build Plan

## 1. PRODUCT

Goon is a public marketing landing page for an AI-powered landing page generator. The product promise, taken directly from the brief: a user describes their business and gets a live, polished page in seconds. The page's job is to convert curious visitors into a waitlist sign-up by demonstrating that speed and polish through its own design, copy, and live demo. It is a single, static-ish Next.js + Tailwind marketing site — no authenticated app, no dashboard, no editor surface (those are out of scope for this build). The primary user is a time-poor founder or marketer evaluating whether they should put their email down. The specific pain being addressed is the gap between "I need a landing page" and "I have a shipping landing page" — the friction of copy, design, and deployment. Every section on this page must reinforce the feeling of "this is the thing I wish I had."

## 2. WHO IT'S FOR

The ICP from the brief is the time-poor founder/marketer who needs a credible web presence without a designer or developer. That shapes concrete product decisions: a single landing page (not a multi-page marketing site) because one URL is what a founder needs to share; a hero that fits above the fold at 1440px with no scrolling required to see the value prop and primary CTA; copy that names the pain ("describe your business, get a live page in seconds") rather than abstract platform language; a waitlist as the only call-to-action because the tool isn't generally available yet; a built-in "see it in action" demo so the visitor can verify the promise without leaving the page. Tone: confident, technical, not hype-y. Space Grotesk and JetBrains Mono signal "this is a tool built by people who ship" — no rounded marketing sans-serifs, no emoji-laden copy.

## 3. LOOK & FEEL

**Visual system**

- **Vibe / positioning:** "Sharp instrument, not a toy." Dark-mode-first. High contrast. Restrained color use — most surfaces stay ink black; indigo and cyan are reserved for emphasis and interactive states; electric teal is the single accent for the primary CTA and brand mark.
- **Color tokens (Tailwind config):**
  - `ink` #0a0a0a — base background
  - `ink-2` #111114 — elevated surfaces, cards
  - `ink-3` #1a1a20 — borders, dividers, input chrome
  - `indigo` #4f46e5 — links, focus rings, secondary highlights
  - `cyan` #06b6d4 — gradient terminus, in-progress states
  - `teal` #14b8a6 — primary CTA fill, brand accent
  - `text-primary` #f5f5f7, `text-muted` #a1a1aa, `text-dim` #71717a
- **Typography:**
  - Headings: **Space Grotesk**, weights 500/600/700, tight tracking (-0.02em on h1/h2, -0.01em elsewhere). h1: clamp(2.5rem, 5vw, 4.5rem). h2: clamp(1.875rem, 3vw, 3rem). h3: 1.5rem.
  - Body: **Space Grotesk** 400, 1rem/1.6, max-width 65ch.
  - Mono accents: **JetBrains Mono** 400 — used for the brand wordmark, inline code-like labels ("01", "→", "describe → generate → publish"), and small uppercase eyebrows.
- **Layout / spacing:** 8px base grid. Section vertical padding `py-24 md:py-32`. Container `max-w-6xl` for content, `max-w-3xl` for prose. Asymmetric grids for features (alternating 6/6 image-left, image-right). Generous negative space; do not crowd.
- **Components:** Buttons (primary teal solid with subtle outer glow, secondary ghost with ink-3 border, both with `font-medium` and `tracking-tight`), Cards (ink-2 background, 1px ink-3 border, `rounded-xl`, hover lifts border to teal/30 and adds `shadow-[0_0_0_1px_rgba(20,184,166,0.3)]`), Badges (small mono uppercase, ink-3 bg, 1px ink-3 border, 10px text), Section headers (eyebrow mono label + h2 + muted subhead), Dividers (1px hairline ink-3), Glow orbs (absolutely positioned, blur(120px), 30% opacity, indigo or cyan, behind hero/CTA sections).
- **Iconography:** Lucide icons, 1.5px stroke, 20px default, currentColor. Used sparingly — one per feature, one per FAQ row, none in the hero.
- **Imagery:** No stock photos. The "visuals" are (a) a live interactive demo panel (terminal-style window with JetBrains Mono output), (b) a generated-page preview card rendered in pure HTML/CSS, and (c) abstract gradient meshes behind sections. All in the brand palette.
- **Interaction / motion:**
  - Cursor-following spotlight on the hero (subtle, 600px radius, teal at 8% opacity, RAF-throttled, disabled on touch).
  - Scroll-triggered fade-up for section content (IntersectionObserver, 0.15s ease-out, no library).
  - Waitlist form: optimistic submit, button label cycles "Joining…" → "You're in", success state replaces form with a confirmation card.
  - All transitions: 150–200ms, `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Reduced motion: all of the above disabled when `prefers-reduced-motion: reduce`.
- **Background treatment:** Ink black with a faint grid overlay (CSS `linear-gradient` lines, 64px spacing, 4% white) on the hero and demo sections only. Subtle noise texture (SVG, 2% opacity) on the body to prevent banding.

**Screens (this is a single page, so "screens" = sections, top to bottom)**

1. **Nav bar** (sticky, `backdrop-blur-md bg-ink/80 border-b border-ink-3/60`)
   - Left: Goon wordmark (JetBrains Mono, 18px, with a small teal square ▪ glyph).
   - Center: anchor links — Features, How it works, Pricing, FAQ.
   - Right: "Join waitlist" button (ghost, sm) → smooth-scrolls to waitlist.

2. **Hero**
   - Eyebrow badge: "● PRIVATE BETA" (mono, teal dot, ink-3 chip).
   - h1: "Describe your business. Get a live page in seconds." Two lines on desktop, three on mobile, with "live page" wrapped in a span with a cyan→teal gradient text fill.
   - Subhead (text-muted, max-w-2xl): "Goon turns a one-line description into a polished, conversion-ready landing page — copy, layout, and design handled. You just ship."
   - CTA row: primary "Join the waitlist" (teal, with arrow →) + secondary "See it in action" (ghost, scrolls to demo).
   - Below CTAs: row of three small mono captions: "No credit card", "Invite-only beta", "Export any time" — separated by a 1px dot, all text-dim.
   - Right side (desktop only, lg+): a tilted (-3deg) preview card showing a mock generated page — the card has a browser chrome bar (three dots, URL pill reading "goon.page/your-startup"), a fake nav, an h2, body copy, and a teal button. Card has a soft teal glow.
   - Background: cursor spotlight + grid overlay + one large blurred indigo orb top-right.

3. **Social proof strip (honest, minimal)**
   - Not testimonials. A single thin row: "Built with" badges for the actual tech — Next.js, Tailwind, OpenAI, Vercel — rendered as small mono labels in ink-3 chips. This is the kind of "proof" a new product can honestly show.
   - Below: a one-line text-dim caption: "Currently in private beta with 200+ founders on the waitlist." **Use a neutral placeholder like "200+" only if the number is real; if not, ship without the number** — do not fabricate a count. Plan default: omit the number, ship the badge row only.

4. **Feature section — 6 cards in a 3×2 grid (md+), 1-col stack on mobile**
   - Section header: eyebrow "FEATURES" + h2 "Everything you need to ship a page that converts" + muted subhead.
   - Each card (icon top-left, h3, 1–2 sentence description, mono footer label like "01 / GENERATION"):
     1. **One-line generation** — Describe your business in plain English. Goon writes the copy, picks the layout, applies the design.
     2. **Conversion-tested templates** — Every generated page is structured around a proven landing page anatomy: hero, social proof, features, pricing, FAQ, CTA.
     3. **Live editor** — Tweak any section in-place. Changes render in real time. No rebuilds, no deploys to preview.
     4. **Brand controls** — Lock in your colors, fonts, and voice. Every page stays on-brand without manual styling.
     5. **One-click publish** — Ship to a `goon.page/your-slug` URL on a custom domain, or export clean HTML/CSS you can host anywhere.
     6. **Built-in analytics** — See visits, signups, and conversion rate on a single dashboard. No third-party scripts to wire up.

5. **How it works — 3 steps, horizontal on md+, vertical on mobile**
   - Section header: eyebrow "HOW IT WORKS" + h2 "From idea to live page in three steps."
   - Each step is a tall card with a large JetBrains Mono numeral (`01`, `02`, `03`) in teal at 96px, a 1px ink-3 divider, then h3 + description:
     - **01 — Describe.** Type a sentence about what you do and who it's for. Add a link if you have one.
     - **02 — Generate.** Goon returns a complete page in under ten seconds — copy, layout, and styling, ready to review.
     - **03 — Publish.** Edit anything you want, hit publish, and share your URL. Custom domains supported on Pro.

6. **Live demo section**
   - Section header: eyebrow "SEE IT IN ACTION" + h2 "Watch Goon build a page."
   - Center: a terminal-style window (ink-2 bg, ink-3 border, rounded-xl, with a fake title bar showing "goon — generate", traffic-light dots in muted colors). Inside, JetBrains Mono output:
     ```
     > describe: "a notetaking app for engineers who hate markdown"
     ✓ analyzing brief
     ✓ drafting copy
     ✓ selecting layout
     ✓ applying theme
     ✓ page ready · 8.4s
     → /preview/quietcode
     ```
   - Below the terminal, a "Try it yourself" mini-form: one text input (placeholder "Describe your business…") + a "Generate" button. **This form is non-functional in v1** — on submit it shows a tooltip "Demo mode — join the waitlist to unlock generation" and focuses the email field further down. This is honest: we don't fake a generation we don't run.
   - Background: indigo glow orb bottom-left.

7. **Pricing teaser**
   - Section header: eyebrow "PRICING" + h2 "Simple, ship-day pricing."
   - Two cards side-by-side (stacks on mobile), the right one elevated with a teal border and a "Most popular" badge:
     - **Starter — Free.** 1 published page, goon.page subdomain, Goon branding in footer.
     - **Pro — $24/mo.** Unlimited pages, custom domain, no Goon branding, analytics, priority generation queue.
   - Below cards: muted caption "Pricing final at launch. Early waitlist members lock in 30% off for life."
   - CTA under both cards: "Join waitlist for early access" → smooth-scroll to waitlist.

8. **FAQ — accordion, 6 questions**
   - Section header: eyebrow "FAQ" + h2 "Questions, answered."
   - Each row: question in h3 weight, mono `+` icon on the right that rotates 45° to `×` when open. Answer slides open with `grid-template-rows` transition (200ms). Only one row open at a time.
   - Questions:
     1. When does Goon launch? — "We're in private beta now and opening access gradually. Join the waitlist to get an invite."
     2. Do I need to know how to code? — "No. Describe your business in plain English. If you can write a tweet, you can use Goon."
     3. Can I edit the page after it's generated? — "Yes. Every section is editable in a live preview. Changes save instantly."
     4. Can I export the code? — "Pro plans can export clean HTML/CSS and host the page anywhere. Starter plans publish to a goon.page subdomain."
     5. What about custom domains? — "Custom domains are included on Pro. Connect any domain you own in two clicks."
     6. Is my data private? — "Your briefs and generated pages are private to your account. We don't train on your content."

9. **Final CTA / Waitlist**
   - Centered, max-w-xl. Eyebrow "GET EARLY ACCESS" + h2 "Ship your page this week." + muted subhead.
   - Form: email input (full width, ink-2 bg, ink-3 border, focus border teal, placeholder "you@startup.com") + submit button (full width on mobile, auto width on desktop, teal solid). On submit: button shows spinner, then form is replaced with a success card (teal border, ✓ icon in teal, "You're on the list. Check your inbox for a confirmation.").
   - Below form: text-dim caption "We'll email you when your invite is ready. No spam, ever."
   - Background: large blurred teal glow behind the card.

10. **Footer**
    - Two columns on md+: left has Goon wordmark + one-line tagline in text-muted; right has three mono link groups — "Product" (Features, Pricing, Changelog), "Company" (About, Blog, Contact), "Legal" (Privacy, Terms). No social icons (no real accounts to link to yet).
    - Bottom row: "© 2026 Goon" on the left, "Built in [city]" placeholder on the right — **use a neutral "Built somewhere on the internet"** until a real location is decided. Avoid fabricating a HQ.

## 4. USER FLOWS

This is a single-page marketing site, so flows are short and centered on the waitlist conversion.

**Flow A — Primary conversion (the only flow that matters)**
1. Land on page → see hero with value prop and primary CTA.
2. Read hero copy → either click "Join the waitlist" (top nav or hero) → smooth-scrolls to final CTA, OR keeps scrolling.
3. Reads Features → reinforces value.
4. Reaches Demo → types something in the mini-form → submits → sees honest "demo mode" tooltip + the page is scrolled to the waitlist form for them.
5. Reaches Pricing → confirms there's a free tier and a clear Pro tier.
6. Reaches FAQ → any objection is answered.
7. Reaches final CTA → enters email → submits → success state confirms.

States: idle, validating (email format check on blur), submitting (button disabled, spinner, label "Joining…"), success (form replaced with confirmation card), error (server returns 4xx/5xx → red border on input, error message below in `text-red-400`, button returns to "Join the waitlist"). If the same email submits twice, return a friendly "You're already on the list" success state — do not error.

**Flow B — Anchor nav**
- Click any nav link → smooth-scroll to that section, active link gets a 2px teal underline, nav stays sticky.

**Flow C — Demo form fallback**
- User submits demo form → inline tooltip appears anchored to the form → page also auto-scrolls to waitlist section after 600ms.

**Flow D — Empty / offline**
- If the waitlist POST fails and the user is offline, show "Couldn't reach the server. Try again?" with a retry button. Do not lose the email from the input.

## 5. PAGES / ROUTES

- **`/` (app/page.tsx)** — The entire marketing landing page. Server component. Composes the section components in order. Fetches any dynamic copy from a `content/site.json` file at build time.
- **`/api/waitlist` (app/api/waitlist/route.ts)** — `POST` endpoint. Validates email server-side with Zod. Inserts into the database (Supabase). Returns `{ ok: true, status: "new" | "existing" }`. Rate-limited: 5 requests / IP / hour. Returns 400 on invalid email, 429 on rate limit, 500 on DB error.
- **`/api/og (app/api/og/route.ts)** — `GET` endpoint using `@vercel/og` to render a 1200×630 social card with the hero headline and the teal→cyan gradient. Used for `og:image`.
- **`/robots.txt` (app/robots.ts)** — Allow all, point sitemap to `/sitemap.xml`.
- **`/sitemap.xml` (app/sitemap.ts)** — Single URL, the home page.
- **`/llms.txt` (app/llms.txt/route.ts)** — Plain text route serving a short brand description for LLM crawlers.
- **`/404 (app/not-found.tsx)** — Custom 404 with the nav, a "Page not found" h1, a "Take me home" ghost button, and the final CTA section.
- **`/500 (app/error.tsx)** — Error boundary with nav, an "Something went wrong" h1, a "Try again" button, and the final CTA.
- **`/` is the only user-facing route. Everything else is supporting infrastructure.**

## 6. CORE FEATURES

1. **Hero with live preview card.** Static rendered card showing a mock generated page. The card has a subtle parallax tilt (CSS `transform: perspective(1000px) rotateX(...) rotateY(...)` driven by pointer position over the hero, capped at ±3deg). No animation library.

2. **Smooth-scroll anchor nav.** A single client component (`<AnchorNav />`) that intercepts anchor clicks, prevents default, calls `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`, and uses an `IntersectionObserver` to track which section is in view and style the corresponding nav link with a teal underline. Disables smooth scroll if `prefers-reduced-motion`.

3. **Cursor spotlight on hero.** A `useEffect` on the hero container that tracks `pointermove` via RAF and updates CSS variables `--x` and `--y` on a `::before` pseudo-element with `background: radial-gradient(600px circle at var(--x) var(--y), rgba(20,184,166,0.08), transparent 60%)`. Disabled on touch devices and when reduced motion is set.

4. **Live demo terminal.** A static, pre-typed sequence rendered in JetBrains Mono. On mount, a client component animates the lines in with a 200ms stagger using `setTimeout`, each line types out character-by-character. After "page ready · 8.4s", a blinking cursor sits on the final line. Re-runs once if the user clicks the terminal. Loops only if reduced motion is not set; otherwise static.

5. **Demo mini-form (honest).** A small client form. On submit, it does not POST — it shows a `<Tooltip>` anchored to the button ("Demo mode — join the waitlist to unlock generation") and triggers a smooth scroll to the waitlist section after 600ms. The form input is uncontrolled; on submit the text is cleared.

6. **Waitlist form with real persistence.** Client component with:
   - Email field with `type="email"`, `required`, `pattern` for basic client-side validation, and on-blur server-style format check (regex).
   - `useTransition` to handle submit state without blocking.
   - POSTs to `/api/waitlist` with JSON body.
   - States: `idle | submitting | success | error`.
   - Success replaces the form with a confirmation card that includes the submitted email.
   - Error renders inline below the input, keeps the email in the field.
   - Honeypot field (`<input name="company" tabIndex={-1} className="hidden">`) for spam — if filled, return 200 silently and skip the DB insert.

7. **FAQ accordion.** Client component with a single `openIndex: number | null` state. Uses CSS `grid-template-rows: 0fr → 1fr` transition on a wrapper div for height animation. Chevron icon rotates with `transition-transform`. Keyboard accessible: `Enter`/`Space` toggles, `Tab` moves between rows, focus ring uses indigo at 2px.

8. **Pricing cards.** Static server-rendered. The "Most popular" card has `ring-1 ring-teal/40` and a `shadow-[0_0_60px_-15px_rgba(20,184,166,0.4)]`.

9. **Scroll-triggered reveal.** A `<Reveal />` client wrapper using `IntersectionObserver` that adds `opacity-100 translate-y-0` when in view, starts at `opacity-0 translate-y-4`. 150ms ease-out. Respects reduced motion.

10. **Metadata & SEO.**
    - `<title>`: "Goon — Describe your business, get a live page in seconds."
    - `<meta description>` matches the subhead.
    - Open Graph + Twitter cards pointing at `/api/og`.
    - `<link rel="icon">` is an inline SVG: a 32×32 ink square with a teal "G" mark in JetBrains Mono.
    - `lang="en"`, `themeColor: #0a0a0a`, viewport meta with `viewportFit: cover`.
    - `app/manifest.ts` for PWA basics (name, short_name, theme_color, background_color, display: standalone, one icon).

11. **Reduced-motion + responsive + a11y.**
    - All animations gated by `useReducedMotion` (custom 6-line hook reading `window.matchMedia`).
    - Layouts: mobile (default, 1-col), tablet `md:` (2-col grids), desktop `lg:` (full 3-col, side-by-side hero).
    - All interactive elements have visible focus rings (`focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink`).
    - Color contrast: text-primary on ink = 18.7:1, text-muted on ink = 8.9:1, both pass WCAG AAA.
    - Skip link at the top: "Skip to content" → jumps to `<main id="content">`.

12. **Analytics (optional, privacy-respecting).** If added: a single `track(event, props)` function that POSTs to `/api/events` (no third-party scripts). Events: `view_hero`, `click_cta`, `submit_waitlist_success`, `submit_waitlist_error`, `open_faq:<n>`. No PII beyond the email on `submit_waitlist_success`. Cookie-less. Document this in the code; ship it off by default behind an env flag.

## 7. DATA MODEL

Single table in Supabase. No app-side relational data on this site.

**`waitlist`**
- `id` uuid, primary key, default `gen_random_uuid()`
- `email` text, not null, unique, lowercased before insert
- `source` text, nullable — which CTA they clicked from (`hero`, `nav`, `final_cta`, `pricing`, `demo_fallback`)
- `referrer` text, nullable — `document.referrer` truncated to 500 chars
- `user_agent` text, nullable — truncated to 500 chars
- `created_at` timestamptz, default `now()`
- `confirmed_at` timestamptz, nullable — set when the confirmation email is double-opted-in (out of scope for v1, but the field exists)
- Indexes: `unique(email)`, `index(created_at desc)`.
- RLS: no public read; inserts allowed via service role key from the API route only.

No other entities. No user accounts. No sessions. No content tables — copy lives in `content/site.json` and is read at build time.

## 8. AUTH

**No authentication on this site.** There is no logged-in state. The only write is the waitlist insert, which is anonymous.

Auth infrastructure that is still in scope: **none.** If a future iteration needs it, the spec will move to Supabase Auth (NextAuth is overkill for a single POST endpoint and Supabase Auth is already what the DB uses). For this build, the `/api/waitlist` route uses the Supabase service role key from `SUPABASE_SERVICE_ROLE_KEY` to insert, with rate limiting via Upstash Redis (or a simple in-memory token bucket if Upstash isn't added — env-gated).

## 9. FILES

```
app/
  layout.tsx                    Root layout: html, body, fonts, metadata, theme color
  page.tsx                      Composes all section components in order
  not-found.tsx                 Custom 404 with nav + CTA
  error.tsx                     Client error boundary
  globals.css                   Tailwind directives, CSS variables, base resets
  manifest.ts                   PWA manifest
  robots.ts                     /robots.txt
  sitemap.ts                    /sitemap.xml
  llms.txt/
    route.ts                    Serves /llms.txt as plain text
  api/
    waitlist/
      route.ts                  POST: validate, rate-limit, insert into Supabase
    og/
      route.ts                  GET: renders 1200x630 social card
    events/
      route.ts                  POST: optional analytics ingestion (env-flagged)
components/
  nav/
    AnchorNav.tsx               Sticky nav with smooth scroll + active section highlight
  hero/
    Hero.tsx                    Eyebrow, h1, subhead, CTA row, preview card slot
    HeroPreviewCard.tsx         Tilted mock-page card with browser chrome
    CursorSpotlight.tsx         Pointer-tracking radial gradient
  sections/
    TechBadges.tsx              "Built with" badge row
    Features.tsx                3x2 feature grid
    HowItWorks.tsx              3-step horizontal cards
    Demo.tsx                    Terminal animation + honest mini-form
    DemoTerminal.tsx            Client component: typing animation
    DemoForm.tsx                Client component: non-functional form with tooltip
    Pricing.tsx                 Two pricing cards
    FAQ.tsx                     Accordion with 6 questions
    FinalCTA.tsx                Waitlist form + success state
  faq/
    AccordionRow.tsx            Single FAQ row with keyboard a11y
  forms/
    WaitlistForm.tsx            Email input + submit, all states, honeypot
  ui/
    Button.tsx                  Primary/ghost button variants
    Card.tsx                    Bordered elevated surface
    Badge.tsx                   Mono uppercase chip
    SectionHeader.tsx           Eyebrow + h2 + subhead
    Reveal.tsx                  IntersectionObserver fade-up wrapper
    Tooltip.tsx                 Anchored tooltip for demo form
    Icon.tsx                    Lucide icon wrapper with consistent sizing
    Logo.tsx                    Goon wordmark + glyph
  motion/
    useReducedMotion.ts         Custom hook reading matchMedia
lib/
  content.ts                    Reads content/site.json, typed
  supabase.ts                   Server-side Supabase client (service role)
  rate-limit.ts                 Token-bucket / Upstash helper
  validate.ts                   Zod schemas (email, waitlist body)
  analytics.ts                  Client-side track() wrapper
content/
  site.json                     All copy: hero, features, steps, pricing, FAQ, footer
public/
  favicon.svg                   Inline-ish SVG: teal "G" on ink
  noise.svg                     2% opacity noise texture
supabase/
  schema.sql                    CREATE TABLE waitlist + indexes + RLS policies
tailwind.config.ts              Brand tokens, font families, custom shadows
next.config.ts                  Images config, experimental flags if needed
.env.example                    SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, etc.
```

## 10. ACCEPTANCE

- [ ] `pnpm dev` boots without warnings; `pnpm build` succeeds; `pnpm lint` and `pnpm typecheck` clean.
- [ ] All sections render in this order on `/`: Nav, Hero, Tech badges, Features, How it works, Demo, Pricing, FAQ, Final CTA, Footer.
- [ ] Hero h1, subhead, and primary CTA are visible above the fold at 1440×900 with no scrolling.
- [ ] Color palette uses only the four brand tokens plus their derived neutrals; no off-brand colors.
- [ ] Fonts: Space Grotesk loads for all text, JetBrains Mono loads for the wordmark, terminal, eyebrows, and mono captions. Self-hosted via `next/font`, no FOUT.
- [ ] `Join the waitlist` CTAs (nav, hero, final CTA) all scroll to the final CTA section.
- [ ] Waitlist form: invalid email shows inline error, valid email POSTs to `/api/waitlist`, success replaces the form with a confirmation card, duplicate email returns "You're already on the list" success.
- [ ] `/api/waitlist` rejects malformed JSON, bad email formats, and over 5 requests / IP / hour.
- [ ] Honeypot field silently drops bot submissions.
- [ ] Demo form never makes a network request; it shows a tooltip and scrolls to the waitlist.
- [ ] FAQ accordion: only one row open at a time, keyboard navigable, focus rings visible.
- [ ] All animations disabled when `prefers-reduced-motion: reduce` is set.
- [ ] All interactive elements have visible focus rings; skip-link present and functional.
- [ ] Page is responsive at 360px, 768px, 1024px, 1440px with no horizontal scroll.
- [ ] Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on a desktop run.
- [ ] `og:image` renders the brand card at 1200×630 when shared on Twitter/LinkedIn.
- [ ] No fabricated testimonials, customer logos, user counts, or press mentions anywhere in the site or in `content/site.json`.
- [ ] `content/site.json` is the single source of truth for all copy; no string literals for user-facing copy inside components.
- [ ] Supabase migration in `supabase/schema.sql` creates the `waitlist` table with the documented columns, indexes, and RLS policies; running it on a fresh project succeeds.

FILES: ["app/layout.tsx", "app/page.tsx", "app/not-found.tsx", "app/error.tsx", "app/globals.css", "app/manifest.ts", "app/robots.ts", "app/sitemap.ts", "app/llms.txt/route.ts", "app/api/waitlist/route.ts", "app/api/og/route.ts", "app/api/events/route.ts", "components/nav/AnchorNav.tsx", "components/hero/Hero.tsx", "components/hero/HeroPreviewCard.tsx", "components/hero/CursorSpotlight.tsx", "components/sections/TechBadges.tsx", "components/sections/Features.tsx", "components/sections/HowItWorks.tsx", "components/sections/Demo.tsx", "components/sections/DemoTerminal.tsx", "components/sections/DemoForm.tsx", "components/sections/Pricing.tsx", "components/sections/FAQ.tsx", "components/sections/FinalCTA.tsx", "components/faq/AccordionRow.tsx", "components/forms/WaitlistForm.tsx", "components/ui/Button.tsx", "components/ui/Card.tsx", "components/ui/Badge.tsx", "components/ui/SectionHeader.tsx", "components/ui/Reveal.tsx", "components/ui/Tooltip.tsx", "components/ui/Icon.tsx", "components/ui/Logo.tsx", "components/motion/useReducedMotion.ts", "lib/content.ts", "lib/supabase.ts", "lib/rate-limit.ts", "lib/validate.ts", "lib/analytics.ts", "content/site.json", "public/favicon.svg", "public/noise.svg", "supabase/schema.sql", "tailwind.config.ts", "next.config.ts", ".env.example"]