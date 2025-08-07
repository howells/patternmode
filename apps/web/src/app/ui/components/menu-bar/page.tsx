import type { Metadata } from "next";

import { menuBarConfig } from "@patternmode/ui/components/menu-bar/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={menuBarConfig.name}
        description={menuBarConfig.description}
        badge={menuBarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="menu-bar"
        componentName={menuBarConfig.name}
        category={menuBarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="menu-bar" />
    </div>
  );
}
