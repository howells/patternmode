import type { Metadata } from "next";

import { responsiveDrawerConfig } from "@patternmode/ui/components/responsive-drawer/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${responsiveDrawerConfig.name} | Patternmode`,
  description: responsiveDrawerConfig.description,
  openGraph: {
    title: `${responsiveDrawerConfig.name} | Patternmode`,
    description: responsiveDrawerConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${responsiveDrawerConfig.name} | Patternmode`,
    description: responsiveDrawerConfig.description,
  },
};

export default function ResponsiveDrawerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={responsiveDrawerConfig.name}
        description={responsiveDrawerConfig.description}
        badge={responsiveDrawerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="responsive-drawer"
        componentName={responsiveDrawerConfig.name}
        category={responsiveDrawerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="responsive-drawer" />
    </div>
  );
}
