import { codeBlockConfig } from "@patternmode/code-block/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${codeBlockConfig.name} | Patternmode`,
  description: codeBlockConfig.description,
  openGraph: {
    title: `${codeBlockConfig.name} | Patternmode`,
    description: codeBlockConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${codeBlockConfig.name} | Patternmode`,
    description: codeBlockConfig.description,
  },
};

export default function CodeBlockPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={codeBlockConfig.badge}
        description={codeBlockConfig.description}
        title={codeBlockConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={codeBlockConfig.category}
        componentId="code-block"
        componentName={codeBlockConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="code-block" />
    </div>
  );
}
