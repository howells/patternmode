import { Separator } from "@patternmode/ui/components/separator";
import { menuConfig } from "@patternmode/ui/components/menu/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function MenuPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={menuConfig.name}
        description={menuConfig.description}
        badge={menuConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="menu"
        componentName={menuConfig.name}
        category={menuConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="menu" />
    </div>
  );
}
