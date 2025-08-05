import { Separator } from "@patternmode/ui/components/separator";
import { previewCardConfig } from "@patternmode/ui/components/preview-card/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${previewCardConfig.name} | Patternmode`,
  description: previewCardConfig.description,
  openGraph: {
    title: `${previewCardConfig.name} | Patternmode`,
    description: previewCardConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${previewCardConfig.name} | Patternmode`,
    description: previewCardConfig.description,
  },
};

export default function PreviewCardPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={previewCardConfig.name}
        description={previewCardConfig.description}
        badge={previewCardConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="preview-card"
        componentName={previewCardConfig.name}
        category={previewCardConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="preview-card" />
    </div>
  );
}
