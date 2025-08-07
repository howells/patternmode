import type { Metadata } from "next";

import { iconContainerConfig } from "@patternmode/ui/components/icon-container/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${iconContainerConfig.name} | Patternmode`,
  description: iconContainerConfig.description,
  openGraph: {
    title: `${iconContainerConfig.name} | Patternmode`,
    description: iconContainerConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${iconContainerConfig.name} | Patternmode`,
    description: iconContainerConfig.description,
  },
};

export default function IconContainerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={iconContainerConfig.name}
        description={iconContainerConfig.description}
        badge={iconContainerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="icon-container"
        componentName={iconContainerConfig.name}
        category={iconContainerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon-container" />
    </div>
  );
}
