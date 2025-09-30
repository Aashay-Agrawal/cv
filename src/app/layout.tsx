import type { Metadata } from "next";
import { Cascadia_Mono } from "next/font/google";
import "./globals.css";

const cascadiaMono = Cascadia_Mono({
  variable: "--font-cascadia-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: "Aashay Agrawal",
  description: "Web Designer",
  icons: {
    icon: "/favicon.png",
  },
  keywords: "Aashay Agrawal, designer, portfolio, creative, freelance",
  authors: [{ name: "Aashay Agrawal" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
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
