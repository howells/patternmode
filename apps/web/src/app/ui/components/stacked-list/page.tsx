import { stackedListConfig } from "@patternmode/ui/components/stacked-list/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${stackedListConfig.name} | Patternmode`,
  description: stackedListConfig.description,
  openGraph: {
    title: `${stackedListConfig.name} | Patternmode`,
    description: stackedListConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${stackedListConfig.name} | Patternmode`,
    description: stackedListConfig.description,
  },
};

export default function StackedListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={stackedListConfig.name}
        description={stackedListConfig.description}
        badge={stackedListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="stacked-list"
        componentName={stackedListConfig.name}
        category={stackedListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="stacked-list" />
    </div>
  );
}
