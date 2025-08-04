import { Separator } from "@patternmode/ui/components/separator";
import { barListConfig } from "@patternmode/ui/components/bar-list/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function BarListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={barListConfig.name}
        description={barListConfig.description}
        badge={barListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="bar-list"
        componentName={barListConfig.name}
        category={barListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="bar-list" />
    </div>
  );
}
