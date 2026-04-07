import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { LayoutTab } from "fumadocs-ui/layouts/shared";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.config";
import { source } from "@/lib/source";

const tabs: LayoutTab[] = [
  { title: "Getting Started", url: "/docs" },
  { title: "UI", url: "/components" },
  { title: "Patterns", url: "/patterns" },
  { title: "Ecosystem", url: "/ecosystem" },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...baseOptions} tree={source.getPageTree()} tabs={tabs}>
      {children}
    </DocsLayout>
  );
}
