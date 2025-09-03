import { responsiveDrawerConfig } from "@patternmode/responsive-drawer/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={responsiveDrawerConfig.badge}
        description={responsiveDrawerConfig.description}
        title={responsiveDrawerConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={responsiveDrawerConfig.category}
        componentId="responsive-drawer"
        componentName={responsiveDrawerConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="responsive-drawer" />
    </div>
  );
}
