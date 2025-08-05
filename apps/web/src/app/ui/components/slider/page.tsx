import { Separator } from "@patternmode/ui/components/separator";
import { sliderConfig } from "@patternmode/ui/components/slider/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${sliderConfig.name} | Patternmode`,
  description: sliderConfig.description,
  openGraph: {
    title: `${sliderConfig.name} | Patternmode`,
    description: sliderConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
