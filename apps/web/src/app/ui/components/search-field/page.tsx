import { searchFieldConfig } from "@patternmode/search-field/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${searchFieldConfig.name} | Patternmode`,
  description: searchFieldConfig.description,
  openGraph: {
    title: `${searchFieldConfig.name} | Patternmode`,
    description: searchFieldConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${searchFieldConfig.name} | Patternmode`,
    description: searchFieldConfig.description,
  },
};

export default function SearchFieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={searchFieldConfig.badge}
        description={searchFieldConfig.description}
        title={searchFieldConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={searchFieldConfig.category}
        componentId="search-field"
        componentName={searchFieldConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="search-field" />
    </div>
  );
}
