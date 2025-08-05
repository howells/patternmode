import { Separator } from "@patternmode/ui/components/separator";
import { tabNavigationConfig } from "@patternmode/ui/components/tab-navigation/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${tabNavigationConfig.name} | Patternmode`,
  description: tabNavigationConfig.description,
  openGraph: {
    title: `${tabNavigationConfig.name} | Patternmode`,
    description: tabNavigationConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
