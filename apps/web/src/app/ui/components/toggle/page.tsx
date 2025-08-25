import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { toggleConfig } from "@patternmode/toggle/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${toggleConfig.name} | Patternmode`,
  description: toggleConfig.description,
  openGraph: {
    title: `${toggleConfig.name} | Patternmode`,
    description: toggleConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${toggleConfig.name} | Patternmode`,
    description: toggleConfig.description,
  },
};

export default function TogglePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={toggleConfig.name}
        description={toggleConfig.description}
        badge={toggleConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="toggle"
        componentName={toggleConfig.name}
        category={toggleConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toggle" />
    </div>
  );
}
