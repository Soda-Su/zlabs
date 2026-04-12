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
  title: "Z Labs",
  description:
    "A curated ecosystem for Bay Area PhDs bridging academic rigor, industrial innovation, and venture creation.",
  openGraph: {
    title: "Z Labs",
    description:
      "The convergence of deep intellect and human experience for Bay Area PhDs and elite tech professionals.",
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
