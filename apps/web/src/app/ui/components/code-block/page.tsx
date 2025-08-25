import type { Metadata } from "next";

import { codeBlockConfig } from "@patternmode/code-block/config";
import { Separator } from "@patternmode/separator";

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
