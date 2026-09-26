import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://mzansimove.co.za"; // update when domain is confirmed

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MzansiMove | Every trip. Visible value.",
  description:
    "A practical operating and data layer for South Africa's minibus taxi economy.",
  robots: { index: false, follow: false }, // flip to true when going live
  icons: { icon: "/favicon.svg" },
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
