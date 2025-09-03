import { gridConfig } from "@patternmode/grid/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${gridConfig.name} | Patternmode`,
  description: gridConfig.description,
  openGraph: {
    title: `${gridConfig.name} | Patternmode`,
    description: gridConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${gridConfig.name} | Patternmode`,
    description: gridConfig.description,
  },
};

export default function GridPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={gridConfig.badge}
        description={gridConfig.description}
        title={gridConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={gridConfig.category}
        componentId="grid"
        componentName={gridConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="grid" />
    </div>
  );
}
