import { Separator } from "@patternmode/ui/components/separator";
import { calloutConfig } from "@patternmode/ui/components/callout/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function CalloutPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={calloutConfig.name}
        description={calloutConfig.description}
        badge={calloutConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="callout"
        componentName={calloutConfig.name}
        category={calloutConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="callout" />
    </div>
  );
}
