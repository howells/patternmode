import { Separator } from "@patternmode/separator";
import { sidebarConfig } from "@patternmode/sidebar/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${sidebarConfig.name} | Patternmode`,
  description: sidebarConfig.description,
  openGraph: {
    title: `${sidebarConfig.name} | Patternmode`,
    description: sidebarConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${sidebarConfig.name} | Patternmode`,
    description: sidebarConfig.description,
  },
};

export default function SidebarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={sidebarConfig.badge}
        description={sidebarConfig.description}
        title={sidebarConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={sidebarConfig.category}
        componentId="sidebar"
        componentName={sidebarConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="sidebar" />
    </div>
  );
}
