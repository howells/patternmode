import type { Metadata } from "next";

import { meterConfig } from "@patternmode/ui/components/meter/config";
import { Separator } from "@patternmode/separator";

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
        title={meterConfig.name}
        description={meterConfig.description}
        badge={meterConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="meter"
        componentName={meterConfig.name}
        category={meterConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="meter" />
    </div>
  );
}
