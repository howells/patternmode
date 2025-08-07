import type { Metadata } from "next";

import { collapsibleConfig } from "@patternmode/ui/components/collapsible/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={collapsibleConfig.name}
        description={collapsibleConfig.description}
        badge={collapsibleConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="collapsible"
        componentName={collapsibleConfig.name}
        category={collapsibleConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="collapsible" />
    </div>
  );
}
