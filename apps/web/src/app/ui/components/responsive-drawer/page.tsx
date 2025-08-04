import { Separator } from "@patternmode/ui/components/separator";
import { responsiveDrawerConfig } from "@patternmode/ui/components/responsive-drawer/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function ResponsiveDrawerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={responsiveDrawerConfig.name}
        description={responsiveDrawerConfig.description}
        badge={responsiveDrawerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="responsive-drawer"
        componentName={responsiveDrawerConfig.name}
        category={responsiveDrawerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="responsive-drawer" />
    </div>
  );
}
