import { Separator } from "@patternmode/ui/components/separator";
import { toggleGroupConfig } from "@patternmode/ui/components/toggle-group/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: toggleGroupConfig.name,
  description: toggleGroupConfig.description,
  openGraph: {
    title: toggleGroupConfig.name,
    description: toggleGroupConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: toggleGroupConfig.name,
    description: toggleGroupConfig.description,
  },
};

export default function ToggleGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={toggleGroupConfig.name}
        description={toggleGroupConfig.description}
        badge={toggleGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="toggle-group"
        componentName={toggleGroupConfig.name}
        category={toggleGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toggle-group" />
    </div>
  );
}
