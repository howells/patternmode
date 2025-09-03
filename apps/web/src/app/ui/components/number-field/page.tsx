import { numberFieldConfig } from "@patternmode/number-field/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${numberFieldConfig.name} | Patternmode`,
  description: numberFieldConfig.description,
  openGraph: {
    title: `${numberFieldConfig.name} | Patternmode`,
    description: numberFieldConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${numberFieldConfig.name} | Patternmode`,
    description: numberFieldConfig.description,
  },
};

export default function NumberFieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={numberFieldConfig.badge}
        description={numberFieldConfig.description}
        title={numberFieldConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={numberFieldConfig.category}
        componentId="number-field"
        componentName={numberFieldConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="number-field" />
    </div>
  );
}
