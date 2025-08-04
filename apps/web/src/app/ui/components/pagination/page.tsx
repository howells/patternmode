import { Separator } from "@patternmode/ui/components/separator";
import { paginationConfig } from "@patternmode/ui/components/pagination/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function PaginationPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={paginationConfig.name}
        description={paginationConfig.description}
        badge={paginationConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="pagination"
        componentName={paginationConfig.name}
        category={paginationConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="pagination" />
    </div>
  );
}
