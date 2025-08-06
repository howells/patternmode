import { carouselConfig } from "@patternmode/ui/components/carousel/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
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
        title={carouselConfig.name}
        description={carouselConfig.description}
        badge={carouselConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="carousel"
        componentName={carouselConfig.name}
        category={carouselConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="carousel" />
    </div>
  );
}
