import { Separator } from "@patternmode/ui/components/separator";
import { categoryBarConfig } from "@patternmode/ui/components/category-bar/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function CategoryBarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={categoryBarConfig.name}
        description={categoryBarConfig.description}
        badge={categoryBarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="category-bar"
        componentName={categoryBarConfig.name}
        category={categoryBarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="category-bar" />
    </div>
  );
}
