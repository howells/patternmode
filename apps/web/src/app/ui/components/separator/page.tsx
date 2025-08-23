import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { separatorConfig } from "@patternmode/separator/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${separatorConfig.name} | Patternmode`,
  description: separatorConfig.description,
  openGraph: {
    title: `${separatorConfig.name} | Patternmode`,
    description: separatorConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${separatorConfig.name} | Patternmode`,
    description: separatorConfig.description,
  },
};

export default function SeparatorPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={separatorConfig.name}
        description={separatorConfig.description}
        badge={separatorConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="separator"
        componentName={separatorConfig.name}
        category={separatorConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="separator" />
    </div>
  );
}
