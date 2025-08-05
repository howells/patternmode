import { Separator } from "@patternmode/ui/components/separator";
import { formConfig } from "@patternmode/ui/components/form/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: formConfig.name,
  description: formConfig.description,
  openGraph: {
    title: formConfig.name,
    description: formConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: formConfig.name,
    description: formConfig.description,
  },
};

export default function FormPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={formConfig.name}
        description={formConfig.description}
        badge={formConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="form"
        componentName={formConfig.name}
        category={formConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="form" />
    </div>
  );
}
