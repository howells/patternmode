import { Separator } from "@patternmode/ui/components/separator";
import { descriptionListConfig } from "@patternmode/ui/components/description-list/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function DescriptionListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={descriptionListConfig.name}
        description={descriptionListConfig.description}
        badge={descriptionListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="description-list"
        componentName={descriptionListConfig.name}
        category={descriptionListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="description-list" />
    </div>
  );
}
