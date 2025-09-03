import { Separator } from "@patternmode/separator";
import { toolbarConfig } from "@patternmode/toolbar/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${toolbarConfig.name} | Patternmode`,
  description: toolbarConfig.description,
  openGraph: {
    title: `${toolbarConfig.name} | Patternmode`,
    description: toolbarConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${toolbarConfig.name} | Patternmode`,
    description: toolbarConfig.description,
  },
};

export default function ToolbarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={toolbarConfig.badge}
        description={toolbarConfig.description}
        title={toolbarConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={toolbarConfig.category}
        componentId="toolbar"
        componentName={toolbarConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toolbar" />
    </div>
  );
}
