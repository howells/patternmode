import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { tagConfig } from "@patternmode/tag/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${tagConfig.name} | Patternmode`,
  description: tagConfig.description,
  openGraph: {
    title: `${tagConfig.name} | Patternmode`,
    description: tagConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tagConfig.name} | Patternmode`,
    description: tagConfig.description,
  },
};

export default function TagPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={tagConfig.name}
        description={tagConfig.description}
        badge={tagConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="tag"
        componentName={tagConfig.name}
        category={tagConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tag" />
    </div>
  );
}
