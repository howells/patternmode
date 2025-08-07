import { Separator } from "@patternmode/ui/components/separator";
import { sortableListConfig } from "@patternmode/ui/components/sortable-list/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${sortableListConfig.name} | Patternmode`,
  description: sortableListConfig.description,
  openGraph: {
    title: `${sortableListConfig.name} | Patternmode`,
    description: sortableListConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
