import type { Metadata } from "next";

import { radioCardGroupConfig } from "@patternmode/radio-card-group/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${radioCardGroupConfig.name} | Patternmode`,
  description: radioCardGroupConfig.description,
  openGraph: {
    title: `${radioCardGroupConfig.name} | Patternmode`,
    description: radioCardGroupConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${radioCardGroupConfig.name} | Patternmode`,
    description: radioCardGroupConfig.description,
  },
};

export default function RadioCardGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={radioCardGroupConfig.name}
        description={radioCardGroupConfig.description}
        badge={radioCardGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="radio-card-group"
        componentName={radioCardGroupConfig.name}
        category={radioCardGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="radio-card-group" />
    </div>
  );
}
