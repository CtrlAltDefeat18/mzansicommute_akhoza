import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MzansiMove | Every trip. Visible value.",
  description: "A practical operating and data layer for South Africa’s minibus taxi economy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-ZA"><body>{children}</body></html>;
}
