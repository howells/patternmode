import { iconConfig } from "@patternmode/icon/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${iconConfig.name} | Patternmode`,
  description: iconConfig.description,
  openGraph: {
    title: `${iconConfig.name} | Patternmode`,
    description: iconConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${iconConfig.name} | Patternmode`,
    description: iconConfig.description,
  },
};

export default function IconPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={iconConfig.badge}
        description={iconConfig.description}
        title={iconConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={iconConfig.category}
        componentId="icon"
        componentName={iconConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon" />
    </div>
  );
}
