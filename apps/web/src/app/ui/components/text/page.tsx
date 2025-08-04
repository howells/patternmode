import { Separator } from "@patternmode/ui/components/separator";
import { textConfig } from "@patternmode/ui/components/text/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function TextPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={textConfig.name}
        description={textConfig.description}
        badge={textConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="text"
        componentName={textConfig.name}
        category={textConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="text" />
    </div>
  );
}
