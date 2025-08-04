import { Separator } from "@patternmode/ui/components/separator";
import { copyButtonConfig } from "@patternmode/ui/components/copy-button/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function CopyButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={copyButtonConfig.name}
        description={copyButtonConfig.description}
        badge={copyButtonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="copy-button"
        componentName={copyButtonConfig.name}
        category={copyButtonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="copy-button" />
    </div>
  );
}
