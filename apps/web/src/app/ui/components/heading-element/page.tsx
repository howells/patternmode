import { headingElementConfig } from "@patternmode/heading-element/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={headingElementConfig.badge}
        description={headingElementConfig.description}
        title={headingElementConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={headingElementConfig.category}
        componentId="heading-element"
        componentName={headingElementConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="heading-element" />
    </div>
  );
}
