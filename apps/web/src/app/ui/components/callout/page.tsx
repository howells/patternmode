import { calloutConfig } from "@patternmode/callout/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${calloutConfig.name} | Patternmode`,
  description: calloutConfig.description,
  openGraph: {
    title: `${calloutConfig.name} | Patternmode`,
    description: calloutConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${calloutConfig.name} | Patternmode`,
    description: calloutConfig.description,
  },
};

export default function CalloutPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={calloutConfig.badge}
        description={calloutConfig.description}
        title={calloutConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={calloutConfig.category}
        componentId="callout"
        componentName={calloutConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="callout" />
    </div>
  );
}
