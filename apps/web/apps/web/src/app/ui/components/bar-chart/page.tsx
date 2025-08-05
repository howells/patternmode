import { Separator } from "@patternmode/ui/components/separator";
import { barChartConfig } from "@patternmode/ui/components/bar-chart/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function BarChartPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={barChartConfig.name}
        description={barChartConfig.description}
        badge={barChartConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="bar-chart"
        componentName={barChartConfig.name}
        category={barChartConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="bar-chart" />
    </div>
  );
}
