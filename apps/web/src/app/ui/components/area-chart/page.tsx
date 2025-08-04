import { Separator } from "@patternmode/ui/components/separator";
import { areaChartConfig } from "@patternmode/ui/components/area-chart/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function AreaChartPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={areaChartConfig.name}
        description={areaChartConfig.description}
        badge={areaChartConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="area-chart"
        componentName={areaChartConfig.name}
        category={areaChartConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="area-chart" />
    </div>
  );
}
