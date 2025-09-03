import { Separator } from "@patternmode/separator";
import { tabsConfig } from "@patternmode/tabs/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${tabsConfig.name} | Patternmode`,
  description: tabsConfig.description,
  openGraph: {
    title: `${tabsConfig.name} | Patternmode`,
    description: tabsConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tabsConfig.name} | Patternmode`,
    description: tabsConfig.description,
  },
};

export default function TabsPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={tabsConfig.badge}
        description={tabsConfig.description}
        title={tabsConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={tabsConfig.category}
        componentId="tabs"
        componentName={tabsConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tabs" />
    </div>
  );
}
