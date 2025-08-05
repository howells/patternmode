import { Separator } from "@patternmode/ui/components/separator";
import { dotConfig } from "@patternmode/ui/components/dot/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: dotConfig.name,
  description: dotConfig.description,
  openGraph: {
    title: dotConfig.name,
    description: dotConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: dotConfig.name,
    description: dotConfig.description,
  },
};

export default function DotPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={dotConfig.name}
        description={dotConfig.description}
        badge={dotConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="dot"
        componentName={dotConfig.name}
        category={dotConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dot" />
    </div>
  );
}
