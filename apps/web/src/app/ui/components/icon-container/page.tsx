import { iconContainerConfig } from "@patternmode/icon-container/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={iconContainerConfig.badge}
        description={iconContainerConfig.description}
        title={iconContainerConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={iconContainerConfig.category}
        componentId="icon-container"
        componentName={iconContainerConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon-container" />
    </div>
  );
}
