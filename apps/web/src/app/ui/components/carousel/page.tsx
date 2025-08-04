import { Separator } from "@patternmode/ui/components/separator";
import { carouselConfig } from "@patternmode/ui/components/carousel/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

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
