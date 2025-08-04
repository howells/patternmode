import { Separator } from "@patternmode/ui/components/separator";
import { searchFieldConfig } from "@patternmode/ui/components/search-field/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function SearchFieldPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={searchFieldConfig.name}
        description={searchFieldConfig.description}
        badge={searchFieldConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="search-field"
        componentName={searchFieldConfig.name}
        category={searchFieldConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="search-field" />
    </div>
  );
}
