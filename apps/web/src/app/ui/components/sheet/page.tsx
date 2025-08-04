import { Separator } from "@patternmode/ui/components/separator";
import { sheetConfig } from "@patternmode/ui/components/sheet/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SheetPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={sheetConfig.name}
        description={sheetConfig.description}
        badge={sheetConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="sheet"
        componentName={sheetConfig.name}
        category={sheetConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="sheet" />
    </div>
  );
}
