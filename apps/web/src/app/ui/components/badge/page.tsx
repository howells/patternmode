import { Separator } from "@patternmode/ui/components/separator";
import { badgeConfig } from "@patternmode/ui/components/badge/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function BadgePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={badgeConfig.name}
        description={badgeConfig.description}
        badge={badgeConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="badge"
        componentName={badgeConfig.name}
        category={badgeConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="badge" />
    </div>
  );
}
