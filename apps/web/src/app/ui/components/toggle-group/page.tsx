import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { toggleGroupConfig } from "@patternmode/toggle-group/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${toggleGroupConfig.name} | Patternmode`,
  description: toggleGroupConfig.description,
  openGraph: {
    title: `${toggleGroupConfig.name} | Patternmode`,
    description: toggleGroupConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${toggleGroupConfig.name} | Patternmode`,
    description: toggleGroupConfig.description,
  },
};

export default function ToggleGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={toggleGroupConfig.name}
        description={toggleGroupConfig.description}
        badge={toggleGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="toggle-group"
        componentName={toggleGroupConfig.name}
        category={toggleGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toggle-group" />
    </div>
  );
}
