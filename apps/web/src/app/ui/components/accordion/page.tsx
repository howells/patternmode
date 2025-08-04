import { Separator } from "@patternmode/ui/components/separator";
import { accordionConfig } from "@patternmode/ui/components/accordion/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function AccordionPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={accordionConfig.name}
        description={accordionConfig.description}
        badge={accordionConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="accordion"
        componentName={accordionConfig.name}
        category={accordionConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="accordion" />
    </div>
  );
}
