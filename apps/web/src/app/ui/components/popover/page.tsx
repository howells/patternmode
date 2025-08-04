import { Separator } from "@patternmode/ui/components/separator";
import { popoverConfig } from "@patternmode/ui/components/popover/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function PopoverPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={popoverConfig.name}
        description={popoverConfig.description}
        badge={popoverConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="popover"
        componentName={popoverConfig.name}
        category={popoverConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="popover" />
    </div>
  );
}
