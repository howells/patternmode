import { Separator } from "@patternmode/separator";
import { stackedListConfig } from "@patternmode/stacked-list/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${stackedListConfig.name} | Patternmode`,
  description: stackedListConfig.description,
  openGraph: {
    title: `${stackedListConfig.name} | Patternmode`,
    description: stackedListConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${stackedListConfig.name} | Patternmode`,
    description: stackedListConfig.description,
  },
};

export default function StackedListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={stackedListConfig.badge}
        description={stackedListConfig.description}
        title={stackedListConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={stackedListConfig.category}
        componentId="stacked-list"
        componentName={stackedListConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="stacked-list" />
    </div>
  );
}
