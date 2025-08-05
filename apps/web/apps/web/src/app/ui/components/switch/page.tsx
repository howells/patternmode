import { Separator } from "@patternmode/ui/components/separator";
import { switchConfig } from "@patternmode/ui/components/switch/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SwitchPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={switchConfig.name}
        description={switchConfig.description}
        badge={switchConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="switch"
        componentName={switchConfig.name}
        category={switchConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="switch" />
    </div>
  );
}
