import { Separator } from "@patternmode/ui/components/separator";
import { headingConfig } from "@patternmode/ui/components/heading/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function HeadingPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={headingConfig.name}
        description={headingConfig.description}
        badge={headingConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="heading"
        componentName={headingConfig.name}
        category={headingConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="heading" />
    </div>
  );
}
