import type { Metadata } from "next";

import { headingConfig } from "@patternmode/heading/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${headingConfig.name} | Patternmode`,
  description: headingConfig.description,
  openGraph: {
    title: `${headingConfig.name} | Patternmode`,
    description: headingConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${headingConfig.name} | Patternmode`,
    description: headingConfig.description,
  },
};

export default function HeadingPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={headingConfig.name}
        description={headingConfig.description}
        badge={headingConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="heading"
        componentName={headingConfig.name}
        category={headingConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="heading" />
    </div>
  );
}
