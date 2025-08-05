import { Separator } from "@patternmode/ui/components/separator";
import { separatorConfig } from "@patternmode/ui/components/separator/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SeparatorPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={separatorConfig.name}
        description={separatorConfig.description}
        badge={separatorConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="separator"
        componentName={separatorConfig.name}
        category={separatorConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="separator" />
    </div>
  );
}
