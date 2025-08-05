import { Separator } from "@patternmode/ui/components/separator";
import { checkboxGroupConfig } from "@patternmode/ui/components/checkbox-group/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function CheckboxGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={checkboxGroupConfig.name}
        description={checkboxGroupConfig.description}
        badge={checkboxGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="checkbox-group"
        componentName={checkboxGroupConfig.name}
        category={checkboxGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="checkbox-group" />
    </div>
  );
}
