import { Separator } from "@patternmode/ui/components/separator";
import { toolbarConfig } from "@patternmode/ui/components/toolbar/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function ToolbarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={toolbarConfig.name}
        description={toolbarConfig.description}
        badge={toolbarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="toolbar"
        componentName={toolbarConfig.name}
        category={toolbarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toolbar" />
    </div>
  );
}
