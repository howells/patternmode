import { Separator } from "@patternmode/ui/components/separator";
import { meterConfig } from "@patternmode/ui/components/meter/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function MeterPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={meterConfig.name}
        description={meterConfig.description}
        badge={meterConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="meter"
        componentName={meterConfig.name}
        category={meterConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="meter" />
    </div>
  );
}
