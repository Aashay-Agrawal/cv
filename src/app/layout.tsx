import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cascadia_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const cascadiaMono = Cascadia_Mono({
  variable: "--font-cascadia-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: "Aashay Agrawal",
  description:
    "Portfolio",
  icons: {
    icon: "/favicon.png",
  },
  keywords: "Aashay Agrawal, designer, portfolio, creative, freelance",
  authors: [{ name: "Aashay Agrawal" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Aashay Agrawal",
    description:
      "Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Aashay Agrawal",
    description:
      "Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cascadiaMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
