import { Separator } from "@patternmode/ui/components/separator";
import { dialogConfig } from "@patternmode/ui/components/dialog/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function DialogPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={dialogConfig.name}
        description={dialogConfig.description}
        badge={dialogConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="dialog"
        componentName={dialogConfig.name}
        category={dialogConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dialog" />
    </div>
  );
}
