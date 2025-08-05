import { Separator } from "@patternmode/ui/components/separator";
import { labelConfig } from "@patternmode/ui/components/label/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function LabelPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={labelConfig.name}
        description={labelConfig.description}
        badge={labelConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="label"
        componentName={labelConfig.name}
        category={labelConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="label" />
    </div>
  );
}
