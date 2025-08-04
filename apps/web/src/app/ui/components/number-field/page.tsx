import { Separator } from "@patternmode/ui/components/separator";
import { numberFieldConfig } from "@patternmode/ui/components/number-field/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function NumberFieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={numberFieldConfig.name}
        description={numberFieldConfig.description}
        badge={numberFieldConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="number-field"
        componentName={numberFieldConfig.name}
        category={numberFieldConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="number-field" />
    </div>
  );
}
