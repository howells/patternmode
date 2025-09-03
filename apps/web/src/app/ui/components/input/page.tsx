import { inputConfig } from "@patternmode/input/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${inputConfig.name} | Patternmode`,
  description: inputConfig.description,
  openGraph: {
    title: `${inputConfig.name} | Patternmode`,
    description: inputConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${inputConfig.name} | Patternmode`,
    description: inputConfig.description,
  },
};

export default function InputPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={inputConfig.badge}
        description={inputConfig.description}
        title={inputConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={inputConfig.category}
        componentId="input"
        componentName={inputConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="input" />
    </div>
  );
}
