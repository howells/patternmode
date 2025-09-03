import { labelConfig } from "@patternmode/label/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${labelConfig.name} | Patternmode`,
  description: labelConfig.description,
  openGraph: {
    title: `${labelConfig.name} | Patternmode`,
    description: labelConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${labelConfig.name} | Patternmode`,
    description: labelConfig.description,
  },
};

export default function LabelPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={labelConfig.badge}
        description={labelConfig.description}
        title={labelConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={labelConfig.category}
        componentId="label"
        componentName={labelConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="label" />
    </div>
  );
}
