import { Separator } from "@patternmode/ui/components/separator";
import { drawerConfig } from "@patternmode/ui/components/drawer/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${drawerConfig.name} | Patternmode`,
  description: drawerConfig.description,
  openGraph: {
    title: `${drawerConfig.name} | Patternmode`,
    description: drawerConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${drawerConfig.name} | Patternmode`,
    description: drawerConfig.description,
  },
};

export default function DrawerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={drawerConfig.name}
        description={drawerConfig.description}
        badge={drawerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="drawer"
        componentName={drawerConfig.name}
        category={drawerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="drawer" />
    </div>
  );
}
