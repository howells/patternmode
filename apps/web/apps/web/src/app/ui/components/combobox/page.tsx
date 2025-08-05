import { Separator } from "@patternmode/ui/components/separator";
import { comboboxConfig } from "@patternmode/ui/components/combobox/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function ComboboxPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={comboboxConfig.name}
        description={comboboxConfig.description}
        badge={comboboxConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="combobox"
        componentName={comboboxConfig.name}
        category={comboboxConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="combobox" />
    </div>
  );
}
