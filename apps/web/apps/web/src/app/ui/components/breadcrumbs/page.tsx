import { Separator } from "@patternmode/ui/components/separator";
import { breadcrumbsConfig } from "@patternmode/ui/components/breadcrumbs/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function BreadcrumbsPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={breadcrumbsConfig.name}
        description={breadcrumbsConfig.description}
        badge={breadcrumbsConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="breadcrumbs"
        componentName={breadcrumbsConfig.name}
        category={breadcrumbsConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="breadcrumbs" />
    </div>
  );
}
