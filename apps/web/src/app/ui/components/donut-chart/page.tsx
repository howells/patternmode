import { Separator } from "@patternmode/ui";
import { componentConfig } from "@patternmode/ui/components/donut-chart/component.config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { ComponentPropExplorer } from "@/features/prop-explorer/component-prop-explorer";

export default function DonutChartPage() {
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
        componentId="donut-chart"
        componentName={componentConfig.name}
        category={componentConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="donut-chart" />
    </div>
  );
}
