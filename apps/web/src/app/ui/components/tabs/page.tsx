import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { tabsConfig } from "@patternmode/ui/components/tabs/config";

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
        title={tabsConfig.name}
        description={tabsConfig.description}
        badge={tabsConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="tabs"
        componentName={tabsConfig.name}
        category={tabsConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tabs" />
    </div>
  );
}
