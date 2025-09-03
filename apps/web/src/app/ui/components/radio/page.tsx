import { radioConfig } from "@patternmode/radio/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${radioConfig.name} | Patternmode`,
  description: radioConfig.description,
  openGraph: {
    title: `${radioConfig.name} | Patternmode`,
    description: radioConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${radioConfig.name} | Patternmode`,
    description: radioConfig.description,
  },
};

export default function RadioPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={radioConfig.badge}
        description={radioConfig.description}
        title={radioConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={radioConfig.category}
        componentId="radio"
        componentName={radioConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="radio" />
    </div>
  );
}
