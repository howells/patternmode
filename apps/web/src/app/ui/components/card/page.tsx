import { Separator } from "@patternmode/ui/components/separator";
import { cardConfig } from "@patternmode/ui/components/card/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function CardPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={cardConfig.name}
        description={cardConfig.description}
        badge={cardConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="card"
        componentName={cardConfig.name}
        category={cardConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="card" />
    </div>
  );
}
