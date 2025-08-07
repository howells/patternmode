import { fieldConfig } from "@patternmode/ui/components/field/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
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
        title={fieldConfig.name}
        description={fieldConfig.description}
        badge={fieldConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="field"
        componentName={fieldConfig.name}
        category={fieldConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="field" />
    </div>
  );
}
