import { badgeConfig } from "@patternmode/badge/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${badgeConfig.name} | Patternmode`,
  description: badgeConfig.description,
  openGraph: {
    title: `${badgeConfig.name} | Patternmode`,
    description: badgeConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${badgeConfig.name} | Patternmode`,
    description: badgeConfig.description,
  },
};

export default function BadgePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={badgeConfig.badge}
        description={badgeConfig.description}
        title={badgeConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={badgeConfig.category}
        componentId="badge"
        componentName={badgeConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="badge" />
    </div>
  );
}
