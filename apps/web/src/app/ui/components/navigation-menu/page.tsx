import type { Metadata } from "next";

import { navigationMenuConfig } from "@patternmode/navigation-menu/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${navigationMenuConfig.name} | Patternmode`,
  description: navigationMenuConfig.description,
  openGraph: {
    title: `${navigationMenuConfig.name} | Patternmode`,
    description: navigationMenuConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${navigationMenuConfig.name} | Patternmode`,
    description: navigationMenuConfig.description,
  },
};

export default function NavigationMenuPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={navigationMenuConfig.name}
        description={navigationMenuConfig.description}
        badge={navigationMenuConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="navigation-menu"
        componentName={navigationMenuConfig.name}
        category={navigationMenuConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="navigation-menu" />
    </div>
  );
}
