import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { sortableListConfig } from "@patternmode/ui/components/sortable-list/config";

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
        title={sortableListConfig.name}
        description={sortableListConfig.description}
        badge={sortableListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="sortable-list"
        componentName={sortableListConfig.name}
        category={sortableListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="sortable-list" />
    </div>
  );
}
