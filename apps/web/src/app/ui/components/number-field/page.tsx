import { Separator } from "@patternmode/ui/components/separator";
import { numberFieldConfig } from "@patternmode/ui/components/number-field/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${numberFieldConfig.name} | Patternmode`,
  description: numberFieldConfig.description,
  openGraph: {
    title: `${numberFieldConfig.name} | Patternmode`,
    description: numberFieldConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${numberFieldConfig.name} | Patternmode`,
    description: numberFieldConfig.description,
  },
};

export default function NumberFieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={numberFieldConfig.name}
        description={numberFieldConfig.description}
        badge={numberFieldConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="number-field"
        componentName={numberFieldConfig.name}
        category={numberFieldConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="number-field" />
    </div>
  );
}
