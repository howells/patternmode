import type { Metadata } from "next";

import { barListConfig } from "@patternmode/ui/components/bar-list/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${barListConfig.name} | Patternmode`,
  description: barListConfig.description,
  openGraph: {
    title: `${barListConfig.name} | Patternmode`,
    description: barListConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${barListConfig.name} | Patternmode`,
    description: barListConfig.description,
  },
};

export default function BarListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={barListConfig.name}
        description={barListConfig.description}
        badge={barListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="bar-list"
        componentName={barListConfig.name}
        category={barListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="bar-list" />
    </div>
  );
}
