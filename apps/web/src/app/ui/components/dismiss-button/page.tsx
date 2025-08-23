import type { Metadata } from "next";

import { dismissButtonConfig } from "@patternmode/ui/components/dismiss-button/config";
import { Separator } from "@patternmode/separator";

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
        title={dismissButtonConfig.name}
        description={dismissButtonConfig.description}
        badge={dismissButtonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="dismiss-button"
        componentName={dismissButtonConfig.name}
        category={dismissButtonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dismiss-button" />
    </div>
  );
}
