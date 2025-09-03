import { Separator } from "@patternmode/separator";
import { sortableListConfig } from "@patternmode/sortable-list/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${sortableListConfig.name} | Patternmode`,
  description: sortableListConfig.description,
  openGraph: {
    title: `${sortableListConfig.name} | Patternmode`,
    description: sortableListConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${sortableListConfig.name} | Patternmode`,
    description: sortableListConfig.description,
  },
};

export default function SortableListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={sortableListConfig.badge}
        description={sortableListConfig.description}
        title={sortableListConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={sortableListConfig.category}
        componentId="sortable-list"
        componentName={sortableListConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="sortable-list" />
    </div>
  );
}
