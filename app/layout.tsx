import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Goon — Describe your business, get a live page in seconds.",
  description:
    "Goon turns a one-line description into a polished, conversion-ready landing page — copy, layout, and design handled. You just ship.",
  openGraph: {
    title: "Goon — Describe your business, get a live page in seconds.",
    description:
      "Goon turns a one-line description into a polished, conversion-ready landing page — copy, layout, and design handled. You just ship.",
    url: "https://goon.page",
    siteName: "Goon",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Goon — Describe your business, get a live page in seconds.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goon — Describe your business, get a live page in seconds.",
    description:
      "Goon turns a one-line description into a polished, conversion-ready landing page — copy, layout, and design handled. You just ship.",
    images: ["/api/og"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://goon.page"),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="noise-overlay">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
