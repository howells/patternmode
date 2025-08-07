import { Separator } from "@patternmode/ui/components/separator";
import { codeBlockConfig } from "@patternmode/ui/components/code-block/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${codeBlockConfig.name} | Patternmode`,
  description: codeBlockConfig.description,
  openGraph: {
    title: `${codeBlockConfig.name} | Patternmode`,
    description: codeBlockConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${codeBlockConfig.name} | Patternmode`,
    description: codeBlockConfig.description,
  },
};

export default function CodeBlockPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={codeBlockConfig.name}
        description={codeBlockConfig.description}
        badge={codeBlockConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="code-block"
        componentName={codeBlockConfig.name}
        category={codeBlockConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="code-block" />
    </div>
  );
}
