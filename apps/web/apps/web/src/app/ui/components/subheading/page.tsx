import { Separator } from "@patternmode/ui/components/separator";
import { subheadingConfig } from "@patternmode/ui/components/subheading/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: subheadingConfig.name,
  description: subheadingConfig.description,
  openGraph: {
    title: subheadingConfig.name,
    description: subheadingConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: subheadingConfig.name,
    description: subheadingConfig.description,
  },
};

export default function SubheadingPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={subheadingConfig.name}
        description={subheadingConfig.description}
        badge={subheadingConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="subheading"
        componentName={subheadingConfig.name}
        category={subheadingConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="subheading" />
    </div>
  );
}
