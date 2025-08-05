import { Separator } from "@patternmode/ui/components/separator";
import { radioCardGroupConfig } from "@patternmode/ui/components/radio-card-group/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: radioCardGroupConfig.name,
  description: radioCardGroupConfig.description,
  openGraph: {
    title: radioCardGroupConfig.name,
    description: radioCardGroupConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: radioCardGroupConfig.name,
    description: radioCardGroupConfig.description,
  },
};

export default function RadioCardGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={radioCardGroupConfig.name}
        description={radioCardGroupConfig.description}
        badge={radioCardGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="radio-card-group"
        componentName={radioCardGroupConfig.name}
        category={radioCardGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="radio-card-group" />
    </div>
  );
}
