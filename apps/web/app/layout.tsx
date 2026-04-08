import { Agentation } from "agentation";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { geistMono, inter, ivarDisplay } from "@/lib/fonts";

import "./global.css";

export const metadata: Metadata = {
  title: "PatternMode",
  description:
    "A canonical UI library, interaction patterns, and curated ecosystem for building refined interfaces.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${inter.variable} ${ivarDisplay.variable} ${geistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="isolate min-h-svh touch-manipulation break-words font-sans antialiased">
        <RootProvider>{children}</RootProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
