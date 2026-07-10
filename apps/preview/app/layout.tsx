import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

/**
 * The @patternmode/theme registry item sets `--font-sans: var(--font-inter), …`.
 * Inter is loaded via next/font/google with the `--font-inter` variable hung on
 * <html>. shadcn's registry:font step manages this const on every sync (it
 * canonicalizes the name to `interInter` and the options to subsets+variable);
 * the sync script re-formats the file to house style afterwards.
 */
const interInter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  description:
    "Stock shadcn components and vendored patternmode components under @patternmode/theme.",
  title: "Patternmode Preview",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={interInter.variable} lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
