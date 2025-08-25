import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { tabNavigationConfig } from "@patternmode/tab-navigation/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${tabNavigationConfig.name} | Patternmode`,
  description: tabNavigationConfig.description,
  openGraph: {
    title: `${tabNavigationConfig.name} | Patternmode`,
    description: tabNavigationConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tabNavigationConfig.name} | Patternmode`,
    description: tabNavigationConfig.description,
  },
};

export default function TabNavigationPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={tabNavigationConfig.name}
        description={tabNavigationConfig.description}
        badge={tabNavigationConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="tab-navigation"
        componentName={tabNavigationConfig.name}
        category={tabNavigationConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tab-navigation" />
    </div>
  );
}
