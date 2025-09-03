import { Separator } from "@patternmode/separator";
import { stackConfig } from "@patternmode/stack/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${stackConfig.name} | Patternmode`,
  description: stackConfig.description,
  openGraph: {
    title: `${stackConfig.name} | Patternmode`,
    description: stackConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${stackConfig.name} | Patternmode`,
    description: stackConfig.description,
  },
};

export default function StackPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={stackConfig.badge}
        description={stackConfig.description}
        title={stackConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={stackConfig.category}
        componentId="stack"
        componentName={stackConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="stack" />
    </div>
  );
}
