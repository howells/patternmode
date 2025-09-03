import { Separator } from "@patternmode/separator";
import { tagConfig } from "@patternmode/tag/config";
import type { Metadata } from "next";

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
        badge={tagConfig.badge}
        description={tagConfig.description}
        title={tagConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={tagConfig.category}
        componentId="tag"
        componentName={tagConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tag" />
    </div>
  );
}
