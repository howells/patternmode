import { Separator } from "@patternmode/separator";
import { toggleConfig } from "@patternmode/toggle/config";
import type { Metadata } from "next";

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
        badge={toggleConfig.badge}
        description={toggleConfig.description}
        title={toggleConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={toggleConfig.category}
        componentId="toggle"
        componentName={toggleConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toggle" />
    </div>
  );
}
