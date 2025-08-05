import { Separator } from "@patternmode/ui/components/separator";
import { tagConfig } from "@patternmode/ui/components/tag/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: tagConfig.name,
  description: tagConfig.description,
  openGraph: {
    title: tagConfig.name,
    description: tagConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: tagConfig.name,
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
