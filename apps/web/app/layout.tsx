import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import "@patternmode/stacksheet/styles.css";
import "@patternmode/aperto/styles.css";
import "@patternmode/deck/styles.css";
import "@patternmode/briolette/styles.css";
import "@patternmode/halo/styles.css";
import "@patternmode/swatch/styles.css";
import "@patternmode/parquet/styles.css";
import "@patternmode/scrollframe/styles.css";
import "@patternmode/status/styles.css";
import "@patternmode/tags/styles.css";
import "@patternmode/verge/styles.css";

export const metadata: Metadata = {
  description: "Minimal catalog for Howells UI tools.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  title: "Patternmode",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
