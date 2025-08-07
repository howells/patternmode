import { Separator } from "@patternmode/ui/components/separator";
import { sparkChartConfig } from "@patternmode/ui/components/spark-chart/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${sparkChartConfig.name} | Patternmode`,
  description: sparkChartConfig.description,
  openGraph: {
    title: `${sparkChartConfig.name} | Patternmode`,
    description: sparkChartConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${sparkChartConfig.name} | Patternmode`,
    description: sparkChartConfig.description,
  },
};

export default function SparkChartPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={sparkChartConfig.name}
        description={sparkChartConfig.description}
        badge={sparkChartConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="spark-chart"
        componentName={sparkChartConfig.name}
        category={sparkChartConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="spark-chart" />
    </div>
  );
}
