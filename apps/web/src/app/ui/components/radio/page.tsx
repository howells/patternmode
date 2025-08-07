import type { Metadata } from "next";

import { radioConfig } from "@patternmode/ui/components/radio/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={radioConfig.name}
        description={radioConfig.description}
        badge={radioConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="radio"
        componentName={radioConfig.name}
        category={radioConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="radio" />
    </div>
  );
}
