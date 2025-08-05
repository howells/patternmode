import { Separator } from "@patternmode/ui/components/separator";
import { collapsibleConfig } from "@patternmode/ui/components/collapsible/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function CollapsiblePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={collapsibleConfig.name}
        description={collapsibleConfig.description}
        badge={collapsibleConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="collapsible"
        componentName={collapsibleConfig.name}
        category={collapsibleConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="collapsible" />
    </div>
  );
}
