import { fieldConfig } from "@patternmode/field/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${fieldConfig.name} | Patternmode`,
  description: fieldConfig.description,
  openGraph: {
    title: `${fieldConfig.name} | Patternmode`,
    description: fieldConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${fieldConfig.name} | Patternmode`,
    description: fieldConfig.description,
  },
};

export default function FieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={fieldConfig.badge}
        description={fieldConfig.description}
        title={fieldConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={fieldConfig.category}
        componentId="field"
        componentName={fieldConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="field" />
    </div>
  );
}
