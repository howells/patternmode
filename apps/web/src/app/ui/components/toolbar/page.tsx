import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { toolbarConfig } from "@patternmode/toolbar/config";

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
        title={toolbarConfig.name}
        description={toolbarConfig.description}
        badge={toolbarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="toolbar"
        componentName={toolbarConfig.name}
        category={toolbarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toolbar" />
    </div>
  );
}
