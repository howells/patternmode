import { Separator } from "@patternmode/ui/components/separator";
import { iconSelectConfig } from "@patternmode/ui/components/icon-select/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function IconSelectPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={iconSelectConfig.name}
        description={iconSelectConfig.description}
        badge={iconSelectConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="icon-select"
        componentName={iconSelectConfig.name}
        category={iconSelectConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon-select" />
    </div>
  );
}
