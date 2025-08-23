import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { tagInputConfig } from "@patternmode/ui/components/tag-input/config";

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
        title={tagInputConfig.name}
        description={tagInputConfig.description}
        badge={tagInputConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="tag-input"
        componentName={tagInputConfig.name}
        category={tagInputConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tag-input" />
    </div>
  );
}
