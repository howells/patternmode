import { fieldArrayConfig } from "@patternmode/field-array/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${fieldArrayConfig.name} | Patternmode`,
  description: fieldArrayConfig.description,
  openGraph: {
    title: `${fieldArrayConfig.name} | Patternmode`,
    description: fieldArrayConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${fieldArrayConfig.name} | Patternmode`,
    description: fieldArrayConfig.description,
  },
};

export default function FieldArrayPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={fieldArrayConfig.badge}
        description={fieldArrayConfig.description}
        title={fieldArrayConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={fieldArrayConfig.category}
        componentId="field-array"
        componentName={fieldArrayConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="field-array" />
    </div>
  );
}
