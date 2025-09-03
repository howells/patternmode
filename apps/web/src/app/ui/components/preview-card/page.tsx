import { previewCardConfig } from "@patternmode/preview-card/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${previewCardConfig.name} | Patternmode`,
  description: previewCardConfig.description,
  openGraph: {
    title: `${previewCardConfig.name} | Patternmode`,
    description: previewCardConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${previewCardConfig.name} | Patternmode`,
    description: previewCardConfig.description,
  },
};

export default function PreviewCardPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={previewCardConfig.badge}
        description={previewCardConfig.description}
        title={previewCardConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={previewCardConfig.category}
        componentId="preview-card"
        componentName={previewCardConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="preview-card" />
    </div>
  );
}
