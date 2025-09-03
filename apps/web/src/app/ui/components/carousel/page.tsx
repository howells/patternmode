import { carouselConfig } from "@patternmode/carousel/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${carouselConfig.name} | Patternmode`,
  description: carouselConfig.description,
  openGraph: {
    title: `${carouselConfig.name} | Patternmode`,
    description: carouselConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${carouselConfig.name} | Patternmode`,
    description: carouselConfig.description,
  },
};

export default function CarouselPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={carouselConfig.badge}
        description={carouselConfig.description}
        title={carouselConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={carouselConfig.category}
        componentId="carousel"
        componentName={carouselConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="carousel" />
    </div>
  );
}
