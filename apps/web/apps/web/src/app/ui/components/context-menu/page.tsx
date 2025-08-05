import { Separator } from "@patternmode/ui/components/separator";
import { contextMenuConfig } from "@patternmode/ui/components/context-menu/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function ContextMenuPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={contextMenuConfig.name}
        description={contextMenuConfig.description}
        badge={contextMenuConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="context-menu"
        componentName={contextMenuConfig.name}
        category={contextMenuConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="context-menu" />
    </div>
  );
}
