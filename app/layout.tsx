import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Z Labs | Deep Intellect & Human Experience (Stealth)",
  description:
    "A private, selective ecosystem for PhDs bridging the gap between AI research and global product impact. Currently in stealth mode.",
  openGraph: {
    title: "Z Labs | Deep Intellect & Human Experience (Stealth)",
    description:
      "A private, selective ecosystem for PhDs bridging the gap between AI research and global product impact. Currently in stealth mode.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
