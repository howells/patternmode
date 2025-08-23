import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { subheadingConfig } from "@patternmode/subheading/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${subheadingConfig.name} | Patternmode`,
  description: subheadingConfig.description,
  openGraph: {
    title: `${subheadingConfig.name} | Patternmode`,
    description: subheadingConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${subheadingConfig.name} | Patternmode`,
    description: subheadingConfig.description,
  },
};

export default function SubheadingPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={subheadingConfig.name}
        description={subheadingConfig.description}
        badge={subheadingConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="subheading"
        componentName={subheadingConfig.name}
        category={subheadingConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="subheading" />
    </div>
  );
}
