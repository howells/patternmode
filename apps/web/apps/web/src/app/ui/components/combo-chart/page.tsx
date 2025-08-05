import { Separator } from "@patternmode/ui/components/separator";
import { comboChartConfig } from "@patternmode/ui/components/combo-chart/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function ComboChartPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={comboChartConfig.name}
        description={comboChartConfig.description}
        badge={comboChartConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="combo-chart"
        componentName={comboChartConfig.name}
        category={comboChartConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="combo-chart" />
    </div>
  );
}
