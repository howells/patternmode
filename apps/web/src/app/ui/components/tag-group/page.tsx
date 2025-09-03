import { Separator } from "@patternmode/separator";
import { tagGroupConfig } from "@patternmode/tag-group/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${tagGroupConfig.name} | Patternmode`,
  description: tagGroupConfig.description,
  openGraph: {
    title: `${tagGroupConfig.name} | Patternmode`,
    description: tagGroupConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tagGroupConfig.name} | Patternmode`,
    description: tagGroupConfig.description,
  },
};

export default function TagGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={tagGroupConfig.badge}
        description={tagGroupConfig.description}
        title={tagGroupConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={tagGroupConfig.category}
        componentId="tag-group"
        componentName={tagGroupConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tag-group" />
    </div>
  );
}
