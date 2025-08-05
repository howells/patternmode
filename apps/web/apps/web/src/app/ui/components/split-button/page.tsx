import { Separator } from "@patternmode/ui/components/separator";
import { splitButtonConfig } from "@patternmode/ui/components/split-button/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SplitButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={splitButtonConfig.name}
        description={splitButtonConfig.description}
        badge={splitButtonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="split-button"
        componentName={splitButtonConfig.name}
        category={splitButtonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="split-button" />
    </div>
  );
}
