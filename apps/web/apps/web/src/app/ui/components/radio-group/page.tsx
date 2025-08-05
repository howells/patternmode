import { Separator } from "@patternmode/ui/components/separator";
import { radioGroupConfig } from "@patternmode/ui/components/radio-group/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function RadioGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={radioGroupConfig.name}
        description={radioGroupConfig.description}
        badge={radioGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="radio-group"
        componentName={radioGroupConfig.name}
        category={radioGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="radio-group" />
    </div>
  );
}
