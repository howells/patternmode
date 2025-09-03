import { menuBarConfig } from "@patternmode/menu-bar/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${menuBarConfig.name} | Patternmode`,
  description: menuBarConfig.description,
  openGraph: {
    title: `${menuBarConfig.name} | Patternmode`,
    description: menuBarConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${menuBarConfig.name} | Patternmode`,
    description: menuBarConfig.description,
  },
};

export default function MenuBarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={menuBarConfig.badge}
        description={menuBarConfig.description}
        title={menuBarConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={menuBarConfig.category}
        componentId="menu-bar"
        componentName={menuBarConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="menu-bar" />
    </div>
  );
}
