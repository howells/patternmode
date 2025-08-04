import { Separator } from "@patternmode/ui/components/separator";
import { progressConfig } from "@patternmode/ui/components/progress/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function ProgressPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={progressConfig.name}
        description={progressConfig.description}
        badge={progressConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="progress"
        componentName={progressConfig.name}
        category={progressConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="progress" />
    </div>
  );
}
