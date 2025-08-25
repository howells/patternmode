import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { sliderConfig } from "@patternmode/slider/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${sliderConfig.name} | Patternmode`,
  description: sliderConfig.description,
  openGraph: {
    title: `${sliderConfig.name} | Patternmode`,
    description: sliderConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${sliderConfig.name} | Patternmode`,
    description: sliderConfig.description,
  },
};

export default function SliderPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={sliderConfig.name}
        description={sliderConfig.description}
        badge={sliderConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="slider"
        componentName={sliderConfig.name}
        category={sliderConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="slider" />
    </div>
  );
}
