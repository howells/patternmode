import { Separator } from "@patternmode/ui/components/separator";
import { headingElementConfig } from "@patternmode/ui/components/heading-element/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: headingElementConfig.name,
  description: headingElementConfig.description,
  openGraph: {
    title: headingElementConfig.name,
    description: headingElementConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: headingElementConfig.name,
    description: headingElementConfig.description,
  },
};

export default function HeadingElementPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={headingElementConfig.name}
        description={headingElementConfig.description}
        badge={headingElementConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="heading-element"
        componentName={headingElementConfig.name}
        category={headingElementConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="heading-element" />
    </div>
  );
}
