import { Separator } from "@patternmode/ui/components/separator";
import { textListConfig } from "@patternmode/ui/components/text-list/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: textListConfig.name,
  description: textListConfig.description,
  openGraph: {
    title: textListConfig.name,
    description: textListConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: textListConfig.name,
    description: textListConfig.description,
  },
};

export default function TextListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={textListConfig.name}
        description={textListConfig.description}
        badge={textListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="text-list"
        componentName={textListConfig.name}
        category={textListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="text-list" />
    </div>
  );
}
