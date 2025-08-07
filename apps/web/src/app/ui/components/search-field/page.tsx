import type { Metadata } from "next";

import { searchFieldConfig } from "@patternmode/ui/components/search-field/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={searchFieldConfig.name}
        description={searchFieldConfig.description}
        badge={searchFieldConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="search-field"
        componentName={searchFieldConfig.name}
        category={searchFieldConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="search-field" />
    </div>
  );
}
