import { Separator } from "@patternmode/ui/components/separator";
import { fieldsetConfig } from "@patternmode/ui/components/fieldset/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: fieldsetConfig.name,
  description: fieldsetConfig.description,
  openGraph: {
    title: fieldsetConfig.name,
    description: fieldsetConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: fieldsetConfig.name,
    description: fieldsetConfig.description,
  },
};

export default function FieldsetPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={fieldsetConfig.name}
        description={fieldsetConfig.description}
        badge={fieldsetConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="fieldset"
        componentName={fieldsetConfig.name}
        category={fieldsetConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="fieldset" />
    </div>
  );
}
