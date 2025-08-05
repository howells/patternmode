import { Separator } from "@patternmode/ui/components/separator";
import { tagInputConfig } from "@patternmode/ui/components/tag-input/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: tagInputConfig.name,
  description: tagInputConfig.description,
  openGraph: {
    title: tagInputConfig.name,
    description: tagInputConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: tagInputConfig.name,
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
