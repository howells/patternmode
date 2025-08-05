import { Separator } from "@patternmode/ui/components/separator";
import { tagGroupConfig } from "@patternmode/ui/components/tag-group/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function TagGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={tagGroupConfig.name}
        description={tagGroupConfig.description}
        badge={tagGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="tag-group"
        componentName={tagGroupConfig.name}
        category={tagGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tag-group" />
    </div>
  );
}
