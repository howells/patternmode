import type { Metadata } from "next";

import { headingElementConfig } from "@patternmode/ui/components/heading-element/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${headingElementConfig.name} | Patternmode`,
  description: headingElementConfig.description,
  openGraph: {
    title: `${headingElementConfig.name} | Patternmode`,
    description: headingElementConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${headingElementConfig.name} | Patternmode`,
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
