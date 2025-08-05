import { Separator } from "@patternmode/ui/components/separator";
import { lineChartConfig } from "@patternmode/ui/components/line-chart/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: lineChartConfig.name,
  description: lineChartConfig.description,
  openGraph: {
    title: lineChartConfig.name,
    description: lineChartConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: lineChartConfig.name,
    description: lineChartConfig.description,
  },
};

export default function LineChartPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={lineChartConfig.name}
        description={lineChartConfig.description}
        badge={lineChartConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="line-chart"
        componentName={lineChartConfig.name}
        category={lineChartConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="line-chart" />
    </div>
  );
}
