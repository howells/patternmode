import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import "@patternmode/channel/styles.css";
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
import "@patternmode/thumbnail/styles.css";
import "@patternmode/verge/styles.css";

import { ThumbIndex } from "@/components/thumb-index";

export const metadata: Metadata = {
  description: "Interface components by Daniel Howells, one React package each.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  title: "Patternmode",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <ThumbIndex />
        <div className="page-frame">{children}</div>
      </body>
    </html>
  );
}
