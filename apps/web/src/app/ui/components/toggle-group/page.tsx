import { Separator } from "@patternmode/separator";
import { toggleGroupConfig } from "@patternmode/toggle-group/config";
import type { Metadata } from "next";

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
        badge={toggleGroupConfig.badge}
        description={toggleGroupConfig.description}
        title={toggleGroupConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={toggleGroupConfig.category}
        componentId="toggle-group"
        componentName={toggleGroupConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toggle-group" />
    </div>
  );
}
