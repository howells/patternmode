import type { Metadata } from "next";

import { areaChartConfig } from "@patternmode/ui/components/area-chart/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${areaChartConfig.name} | Patternmode`,
  description: areaChartConfig.description,
  openGraph: {
    title: `${areaChartConfig.name} | Patternmode`,
    description: areaChartConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${areaChartConfig.name} | Patternmode`,
    description: areaChartConfig.description,
  },
};

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
