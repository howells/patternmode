import type { Metadata } from "next";

import { lineChartConfig } from "@patternmode/ui/components/line-chart/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${lineChartConfig.name} | Patternmode`,
  description: lineChartConfig.description,
  openGraph: {
    title: `${lineChartConfig.name} | Patternmode`,
    description: lineChartConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${lineChartConfig.name} | Patternmode`,
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
