import type { Metadata } from "next";

import { contextMenuConfig } from "@patternmode/context-menu/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${contextMenuConfig.name} | Patternmode`,
  description: contextMenuConfig.description,
  openGraph: {
    title: `${contextMenuConfig.name} | Patternmode`,
    description: contextMenuConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${contextMenuConfig.name} | Patternmode`,
    description: contextMenuConfig.description,
  },
};

export default function ContextMenuPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={contextMenuConfig.name}
        description={contextMenuConfig.description}
        badge={contextMenuConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="context-menu"
        componentName={contextMenuConfig.name}
        category={contextMenuConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="context-menu" />
    </div>
  );
}
