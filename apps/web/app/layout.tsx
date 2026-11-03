import type { Metadata, Viewport } from "next";
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

import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  description: "Interface components by Daniel Howells, one React package each.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  title: "Patternmode",
};

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
  viewportFit: "cover",
};

/**
 * The window never scrolls. One compact header sits above a clipped region,
 * and each page brings its own scrolling pane: Home's single column, or a
 * component's reference beside its fixed demo.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="site">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <div className="site-main">{children}</div>
      </body>
    </html>
  );
}
