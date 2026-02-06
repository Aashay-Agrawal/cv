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
  title: "Aashay Agrawal — Product Designer",
  description: "Hey, I'm Aashay. I'm a Designer. While I design for a living, I don't really like to label myself as a designer. I'm neither worthy enough to have that title, nor desire enough to earn it. The best way to define me is — I'm just someone you can rent to solve your problems. Basically, my time. Putting yourself into a single title or label feels like bondage, and I'm not someone who does that. I want to be free. Most of what I do in life is simply following my desires sincerely, just going with the flow wherever it takes me. It's like my self is on a raft, drifting down a river without any external force.",
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
