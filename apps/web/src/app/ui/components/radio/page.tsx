import { Separator } from "@patternmode/ui/components/separator";
import { radioConfig } from "@patternmode/ui/components/radio/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function RadioPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={radioConfig.name}
        description={radioConfig.description}
        badge={radioConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="radio"
        componentName={radioConfig.name}
        category={radioConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="radio" />
    </div>
  );
}
