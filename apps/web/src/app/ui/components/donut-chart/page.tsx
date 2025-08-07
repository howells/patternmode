import { Separator } from "@patternmode/ui/components/separator";
import { donutChartConfig } from "@patternmode/ui/components/donut-chart/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${donutChartConfig.name} | Patternmode`,
  description: donutChartConfig.description,
  openGraph: {
    title: `${donutChartConfig.name} | Patternmode`,
    description: donutChartConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${donutChartConfig.name} | Patternmode`,
    description: donutChartConfig.description,
  },
};

export default function DonutChartPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={donutChartConfig.name}
        description={donutChartConfig.description}
        badge={donutChartConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="donut-chart"
        componentName={donutChartConfig.name}
        category={donutChartConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="donut-chart" />
    </div>
  );
}
