import { dismissButtonConfig } from "@patternmode/dismiss-button/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${dismissButtonConfig.name} | Patternmode`,
  description: dismissButtonConfig.description,
  openGraph: {
    title: `${dismissButtonConfig.name} | Patternmode`,
    description: dismissButtonConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${dismissButtonConfig.name} | Patternmode`,
    description: dismissButtonConfig.description,
  },
};

export default function DismissButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={dismissButtonConfig.badge}
        description={dismissButtonConfig.description}
        title={dismissButtonConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={dismissButtonConfig.category}
        componentId="dismiss-button"
        componentName={dismissButtonConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dismiss-button" />
    </div>
  );
}
