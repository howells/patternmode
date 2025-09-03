import { menuConfig } from "@patternmode/menu/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${menuConfig.name} | Patternmode`,
  description: menuConfig.description,
  openGraph: {
    title: `${menuConfig.name} | Patternmode`,
    description: menuConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${menuConfig.name} | Patternmode`,
    description: menuConfig.description,
  },
};

export default function MenuPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={menuConfig.badge}
        description={menuConfig.description}
        title={menuConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={menuConfig.category}
        componentId="menu"
        componentName={menuConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="menu" />
    </div>
  );
}
