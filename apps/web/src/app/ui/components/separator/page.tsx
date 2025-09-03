import { Separator } from "@patternmode/separator";
import { separatorConfig } from "@patternmode/separator/config";
import type { Metadata } from "next";

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
        badge={separatorConfig.badge}
        description={separatorConfig.description}
        title={separatorConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={separatorConfig.category}
        componentId="separator"
        componentName={separatorConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="separator" />
    </div>
  );
}
