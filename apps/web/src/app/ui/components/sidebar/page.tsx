import { Separator } from "@patternmode/ui/components/separator";
import { sidebarConfig } from "@patternmode/ui/components/sidebar/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SidebarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={sidebarConfig.name}
        description={sidebarConfig.description}
        badge={sidebarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="sidebar"
        componentName={sidebarConfig.name}
        category={sidebarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="sidebar" />
    </div>
  );
}
