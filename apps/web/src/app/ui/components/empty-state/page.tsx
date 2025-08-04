import { Separator } from "@patternmode/ui/components/separator";
import { emptyStateConfig } from "@patternmode/ui/components/empty-state/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function EmptyStatePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={emptyStateConfig.name}
        description={emptyStateConfig.description}
        badge={emptyStateConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="empty-state"
        componentName={emptyStateConfig.name}
        category={emptyStateConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="empty-state" />
    </div>
  );
}
