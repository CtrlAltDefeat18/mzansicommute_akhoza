import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://mzansimove.co.za"; // update once the domain is confirmed

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MzansiMove | Every trip. Visible value.",
  description:
    "A practical operating and data layer for South Africa's minibus taxi economy.",
  // Pre-pilot: keep the site out of search results and social scraping
  // until the team is ready to stand behind the published numbers publicly.
  // Flip both to true when you go live.
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "MzansiMove | Every trip. Visible value.",
    description:
      "A practical operating and data layer for South Africa's minibus taxi economy.",
    url: siteUrl,
    siteName: "MzansiMove",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MzansiMove | Every trip. Visible value.",
    description:
      "A practical operating and data layer for South Africa's minibus taxi economy.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f2eb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>{children}</body>
    </html>
  );
}