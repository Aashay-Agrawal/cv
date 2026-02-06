import type { Metadata, Viewport } from "next";
import { Cascadia_Mono } from "next/font/google";
import "./globals.css";

const cascadiaMono = Cascadia_Mono({
  variable: "--font-cascadia-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Aashay Agrawal",
  description: "Hey I'm Aashay, I'm an independent designer working with Rive and Framer to build interactive, high-quality digital experiences.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: "Aashay Agrawal, Designer, Portfolio, Designer, Freelancer",
  authors: [{ name: "Aashay Agrawal" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cascadiaMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
