import { Separator } from "@patternmode/ui/components/separator";
import { loaderConfig } from "@patternmode/ui/components/loader/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function LoaderPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={loaderConfig.name}
        description={loaderConfig.description}
        badge={loaderConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="loader"
        componentName={loaderConfig.name}
        category={loaderConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="loader" />
    </div>
  );
}
