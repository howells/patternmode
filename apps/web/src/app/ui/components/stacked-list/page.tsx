import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { stackedListConfig } from "@patternmode/stacked-list/config";

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
        title={stackedListConfig.name}
        description={stackedListConfig.description}
        badge={stackedListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="stacked-list"
        componentName={stackedListConfig.name}
        category={stackedListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="stacked-list" />
    </div>
  );
}
