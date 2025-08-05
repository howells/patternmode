import { Separator } from "@patternmode/ui/components/separator";
import { navigationMenuConfig } from "@patternmode/ui/components/navigation-menu/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function NavigationMenuPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={navigationMenuConfig.name}
        description={navigationMenuConfig.description}
        badge={navigationMenuConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="navigation-menu"
        componentName={navigationMenuConfig.name}
        category={navigationMenuConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="navigation-menu" />
    </div>
  );
}
