import { Separator } from "@patternmode/separator";
import { subheadingConfig } from "@patternmode/subheading/config";
import type { Metadata } from "next";

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
        badge={subheadingConfig.badge}
        description={subheadingConfig.description}
        title={subheadingConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={subheadingConfig.category}
        componentId="subheading"
        componentName={subheadingConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="subheading" />
    </div>
  );
}
