import { Separator } from "@patternmode/ui/components/separator";
import { formConfig } from "@patternmode/ui/components/form/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

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
