import { collapsibleConfig } from "@patternmode/collapsible/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${collapsibleConfig.name} | Patternmode`,
  description: collapsibleConfig.description,
  openGraph: {
    title: `${collapsibleConfig.name} | Patternmode`,
    description: collapsibleConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${collapsibleConfig.name} | Patternmode`,
    description: collapsibleConfig.description,
  },
};

export default function CollapsiblePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={collapsibleConfig.badge}
        description={collapsibleConfig.description}
        title={collapsibleConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={collapsibleConfig.category}
        componentId="collapsible"
        componentName={collapsibleConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="collapsible" />
    </div>
  );
}
