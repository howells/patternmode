import { Separator } from "@patternmode/ui/components/separator";
import { menuBarConfig } from "@patternmode/ui/components/menu-bar/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function MenuBarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={menuBarConfig.name}
        description={menuBarConfig.description}
        badge={menuBarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="menu-bar"
        componentName={menuBarConfig.name}
        category={menuBarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="menu-bar" />
    </div>
  );
}
