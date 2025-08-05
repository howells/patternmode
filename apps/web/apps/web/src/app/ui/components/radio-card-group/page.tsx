import { Separator } from "@patternmode/ui/components/separator";
import { radioCardGroupConfig } from "@patternmode/ui/components/radio-card-group/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

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
