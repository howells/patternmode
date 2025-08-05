import { Separator } from "@patternmode/ui/components/separator";
import { tabsConfig } from "@patternmode/ui/components/tabs/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: tabsConfig.name,
  description: tabsConfig.description,
  openGraph: {
    title: tabsConfig.name,
    description: tabsConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: tabsConfig.name,
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
