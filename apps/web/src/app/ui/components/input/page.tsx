import { Separator } from "@patternmode/ui/components/separator";
import { inputConfig } from "@patternmode/ui/components/input/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${inputConfig.name} | Patternmode`,
  description: inputConfig.description,
  openGraph: {
    title: `${inputConfig.name} | Patternmode`,
    description: inputConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${inputConfig.name} | Patternmode`,
    description: inputConfig.description,
  },
};

export default function InputPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={inputConfig.name}
        description={inputConfig.description}
        badge={inputConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="input"
        componentName={inputConfig.name}
        category={inputConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="input" />
    </div>
  );
}
