import { iconSelectConfig } from "@patternmode/icon-select/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${iconSelectConfig.name} | Patternmode`,
  description: iconSelectConfig.description,
  openGraph: {
    title: `${iconSelectConfig.name} | Patternmode`,
    description: iconSelectConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${iconSelectConfig.name} | Patternmode`,
    description: iconSelectConfig.description,
  },
};

export default function IconSelectPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={iconSelectConfig.badge}
        description={iconSelectConfig.description}
        title={iconSelectConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={iconSelectConfig.category}
        componentId="icon-select"
        componentName={iconSelectConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon-select" />
    </div>
  );
}
