import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "Stock shadcn components and vendored patternmode components under @patternmode/theme.",
  title: "Patternmode Preview",
};

/**
 * Inter is not wired here: the `font-inter` registry item (a transitive
 * dependency of @patternmode/theme) injects `@fontsource-variable/inter`
 * imports and `--font-inter` into globals.css on every registry sync — the
 * same path external consumers get.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
