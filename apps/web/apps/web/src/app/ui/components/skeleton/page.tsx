import { Separator } from "@patternmode/ui/components/separator";
import { skeletonConfig } from "@patternmode/ui/components/skeleton/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SkeletonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={skeletonConfig.name}
        description={skeletonConfig.description}
        badge={skeletonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="skeleton"
        componentName={skeletonConfig.name}
        category={skeletonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="skeleton" />
    </div>
  );
}
