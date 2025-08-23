import type { Metadata } from "next";

import { comboChartConfig } from "@patternmode/ui/components/combo-chart/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${comboChartConfig.name} | Patternmode`,
  description: comboChartConfig.description,
  openGraph: {
    title: `${comboChartConfig.name} | Patternmode`,
    description: comboChartConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${comboChartConfig.name} | Patternmode`,
    description: comboChartConfig.description,
  },
};

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
