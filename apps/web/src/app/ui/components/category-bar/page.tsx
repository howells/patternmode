import type { Metadata } from "next";

import { categoryBarConfig } from "@patternmode/ui/components/category-bar/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${categoryBarConfig.name} | Patternmode`,
  description: categoryBarConfig.description,
  openGraph: {
    title: `${categoryBarConfig.name} | Patternmode`,
    description: categoryBarConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${categoryBarConfig.name} | Patternmode`,
    description: categoryBarConfig.description,
  },
};

export default function CategoryBarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={categoryBarConfig.name}
        description={categoryBarConfig.description}
        badge={categoryBarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="category-bar"
        componentName={categoryBarConfig.name}
        category={categoryBarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="category-bar" />
    </div>
  );
}
