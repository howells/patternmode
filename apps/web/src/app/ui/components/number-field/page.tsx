import { Separator } from "@patternmode/ui";
import { componentConfig } from "@patternmode/ui/components/number-field/component.config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { ComponentPropExplorer } from "@/features/prop-explorer/component-prop-explorer";

export default function NumberFieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={componentConfig.name}
        description={componentConfig.description}
        badge={componentConfig.badge}
      />

      {/* Main Content - Use ComponentPropExplorer */}
      <ComponentPropExplorer
        componentId="number-field"
        componentName={componentConfig.name}
        category={componentConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="number-field" />
    </div>
  );
}
