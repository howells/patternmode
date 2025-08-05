import { Separator } from "@patternmode/ui/components/separator";
import { buttonConfig } from "@patternmode/ui/components/button/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: buttonConfig.name,
  description: buttonConfig.description,
  openGraph: {
    title: buttonConfig.name,
    description: buttonConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: buttonConfig.name,
    description: buttonConfig.description,
  },
};

export default function ButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={buttonConfig.name}
        description={buttonConfig.description}
        badge={buttonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="button"
        componentName={buttonConfig.name}
        category={buttonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="button" />
    </div>
  );
}
