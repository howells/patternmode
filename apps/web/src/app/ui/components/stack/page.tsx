import { Separator } from "@patternmode/ui/components/separator";
import { stackConfig } from "@patternmode/ui/components/stack/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function StackPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={stackConfig.name}
        description={stackConfig.description}
        badge={stackConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="stack"
        componentName={stackConfig.name}
        category={stackConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="stack" />
    </div>
  );
}
