import { Separator } from "@patternmode/ui/components/separator";
import { collapsibleConfig } from "@patternmode/ui/components/collapsible/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: collapsibleConfig.name,
  description: collapsibleConfig.description,
  openGraph: {
    title: collapsibleConfig.name,
    description: collapsibleConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: collapsibleConfig.name,
    description: collapsibleConfig.description,
  },
};

export default function CollapsiblePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={collapsibleConfig.name}
        description={collapsibleConfig.description}
        badge={collapsibleConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="collapsible"
        componentName={collapsibleConfig.name}
        category={collapsibleConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="collapsible" />
    </div>
  );
}
