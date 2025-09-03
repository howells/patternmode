import { descriptionListConfig } from "@patternmode/description-list/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${descriptionListConfig.name} | Patternmode`,
  description: descriptionListConfig.description,
  openGraph: {
    title: `${descriptionListConfig.name} | Patternmode`,
    description: descriptionListConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${descriptionListConfig.name} | Patternmode`,
    description: descriptionListConfig.description,
  },
};

export default function DescriptionListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={descriptionListConfig.badge}
        description={descriptionListConfig.description}
        title={descriptionListConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={descriptionListConfig.category}
        componentId="description-list"
        componentName={descriptionListConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="description-list" />
    </div>
  );
}
