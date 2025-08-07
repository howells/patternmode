import type { Metadata } from "next";

import { barChartConfig } from "@patternmode/ui/components/bar-chart/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${barChartConfig.name} | Patternmode`,
  description: barChartConfig.description,
  openGraph: {
    title: `${barChartConfig.name} | Patternmode`,
    description: barChartConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${barChartConfig.name} | Patternmode`,
    description: barChartConfig.description,
  },
};

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
