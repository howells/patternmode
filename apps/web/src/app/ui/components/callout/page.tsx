import type { Metadata } from "next";

import { calloutConfig } from "@patternmode/ui/components/callout/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={calloutConfig.name}
        description={calloutConfig.description}
        badge={calloutConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="callout"
        componentName={calloutConfig.name}
        category={calloutConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="callout" />
    </div>
  );
}
