import { Separator } from "@patternmode/separator";
import { tagInputConfig } from "@patternmode/tag-input/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${tagInputConfig.name} | Patternmode`,
  description: tagInputConfig.description,
  openGraph: {
    title: `${tagInputConfig.name} | Patternmode`,
    description: tagInputConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tagInputConfig.name} | Patternmode`,
    description: tagInputConfig.description,
  },
};

export default function TagInputPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={tagInputConfig.badge}
        description={tagInputConfig.description}
        title={tagInputConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={tagInputConfig.category}
        componentId="tag-input"
        componentName={tagInputConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tag-input" />
    </div>
  );
}
