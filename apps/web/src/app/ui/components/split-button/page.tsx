import { Separator } from "@patternmode/separator";
import { splitButtonConfig } from "@patternmode/split-button/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${splitButtonConfig.name} | Patternmode`,
  description: splitButtonConfig.description,
  openGraph: {
    title: `${splitButtonConfig.name} | Patternmode`,
    description: splitButtonConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${splitButtonConfig.name} | Patternmode`,
    description: splitButtonConfig.description,
  },
};

export default function SplitButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={splitButtonConfig.badge}
        description={splitButtonConfig.description}
        title={splitButtonConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={splitButtonConfig.category}
        componentId="split-button"
        componentName={splitButtonConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="split-button" />
    </div>
  );
}
