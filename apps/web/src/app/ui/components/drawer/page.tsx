import { drawerConfig } from "@patternmode/drawer/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${drawerConfig.name} | Patternmode`,
  description: drawerConfig.description,
  openGraph: {
    title: `${drawerConfig.name} | Patternmode`,
    description: drawerConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${drawerConfig.name} | Patternmode`,
    description: drawerConfig.description,
  },
};

export default function DrawerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={drawerConfig.badge}
        description={drawerConfig.description}
        title={drawerConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={drawerConfig.category}
        componentId="drawer"
        componentName={drawerConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="drawer" />
    </div>
  );
}
