import { Separator } from "@patternmode/ui/components/separator";
import { checkboxConfig } from "@patternmode/ui/components/checkbox/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${checkboxConfig.name} | Patternmode`,
  description: checkboxConfig.description,
  openGraph: {
    title: `${checkboxConfig.name} | Patternmode`,
    description: checkboxConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${checkboxConfig.name} | Patternmode`,
    description: checkboxConfig.description,
  },
};

export default function CheckboxPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={checkboxConfig.name}
        description={checkboxConfig.description}
        badge={checkboxConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="checkbox"
        componentName={checkboxConfig.name}
        category={checkboxConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="checkbox" />
    </div>
  );
}
