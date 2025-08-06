import { fieldArrayConfig } from "@patternmode/ui/components/field-array/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
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
        title={fieldArrayConfig.name}
        description={fieldArrayConfig.description}
        badge={fieldArrayConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="field-array"
        componentName={fieldArrayConfig.name}
        category={fieldArrayConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="field-array" />
    </div>
  );
}
