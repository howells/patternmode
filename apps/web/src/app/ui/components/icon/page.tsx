import { Separator } from "@patternmode/ui/components/separator";
import { iconConfig } from "@patternmode/ui/components/icon/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function IconPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={iconConfig.name}
        description={iconConfig.description}
        badge={iconConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="icon"
        componentName={iconConfig.name}
        category={iconConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon" />
    </div>
  );
}
