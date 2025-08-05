import { Separator } from "@patternmode/ui/components/separator";
import { selectConfig } from "@patternmode/ui/components/select/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SelectPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={selectConfig.name}
        description={selectConfig.description}
        badge={selectConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="select"
        componentName={selectConfig.name}
        category={selectConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="select" />
    </div>
  );
}
