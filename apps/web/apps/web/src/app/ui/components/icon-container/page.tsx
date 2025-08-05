import { Separator } from "@patternmode/ui/components/separator";
import { iconContainerConfig } from "@patternmode/ui/components/icon-container/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function IconContainerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={iconContainerConfig.name}
        description={iconContainerConfig.description}
        badge={iconContainerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="icon-container"
        componentName={iconContainerConfig.name}
        category={iconContainerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon-container" />
    </div>
  );
}
