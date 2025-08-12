import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-cascadia-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

// Resolve the deployment base URL for absolute social image URLs
const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
const socialImageUrl = new URL("/social.png", deploymentUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(deploymentUrl),
  title: "Aashay Agrawal",
  description: "Portfolio",
  icons: {
    icon: "/favicon.png",
  },
  keywords: "Aashay Agrawal, designer, portfolio, creative, freelance",
  authors: [{ name: "Aashay Agrawal" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Aashay Agrawal",
    description: "Portfolio",
    type: "website",
    locale: "en_US",
    siteName: "Aashay Agrawal",
    url: deploymentUrl,
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Aashay Agrawal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aashay Agrawal",
    description: "Portfolio",
    images: [socialImageUrl],
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
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
