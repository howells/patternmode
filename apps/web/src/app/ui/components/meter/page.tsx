import { meterConfig } from "@patternmode/meter/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${meterConfig.name} | Patternmode`,
  description: meterConfig.description,
  openGraph: {
    title: `${meterConfig.name} | Patternmode`,
    description: meterConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${meterConfig.name} | Patternmode`,
    description: meterConfig.description,
  },
};

export default function MeterPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={meterConfig.badge}
        description={meterConfig.description}
        title={meterConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={meterConfig.category}
        componentId="meter"
        componentName={meterConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="meter" />
    </div>
  );
}
