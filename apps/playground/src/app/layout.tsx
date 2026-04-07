import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ivarDisplay = localFont({
  src: [
    {
      path: "./fonts/IvarDisplay-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/IvarDisplay-Medium.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./fonts/IvarDisplay-Italic.otf",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patternmode Playground",
  description: "Integration sandbox for the Patternmode canonical UI library.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${inter.variable} ${ivarDisplay.variable} ${geistMono.variable}`}
      lang="en"
    >
      <body className="isolate min-h-svh touch-manipulation break-words font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
