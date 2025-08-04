import { Separator } from "@patternmode/ui/components/separator";
import { gridConfig } from "@patternmode/ui/components/grid/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function GridPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={gridConfig.name}
        description={gridConfig.description}
        badge={gridConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="grid"
        componentName={gridConfig.name}
        category={gridConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="grid" />
    </div>
  );
}
