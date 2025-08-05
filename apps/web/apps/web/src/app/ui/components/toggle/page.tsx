import { Separator } from "@patternmode/ui/components/separator";
import { toggleConfig } from "@patternmode/ui/components/toggle/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: toggleConfig.name,
  description: toggleConfig.description,
  openGraph: {
    title: toggleConfig.name,
    description: toggleConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: toggleConfig.name,
    description: toggleConfig.description,
  },
};

export default function TogglePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={toggleConfig.name}
        description={toggleConfig.description}
        badge={toggleConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="toggle"
        componentName={toggleConfig.name}
        category={toggleConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toggle" />
    </div>
  );
}
