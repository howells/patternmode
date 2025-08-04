import { Separator } from "@patternmode/ui";
import { componentConfig } from "@patternmode/ui/components/icon-select/component.config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { ComponentPropExplorer } from "@/features/prop-explorer/component-prop-explorer";

export default function IconSelectPage() {
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
        componentId="icon-select"
        componentName={componentConfig.name}
        category={componentConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon-select" />
    </div>
  );
}
