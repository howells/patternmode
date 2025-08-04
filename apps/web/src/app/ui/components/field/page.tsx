import { Separator } from "@patternmode/ui/components/separator";
import { fieldConfig } from "@patternmode/ui/components/field/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function FieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={fieldConfig.name}
        description={fieldConfig.description}
        badge={fieldConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="field"
        componentName={fieldConfig.name}
        category={fieldConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="field" />
    </div>
  );
}
