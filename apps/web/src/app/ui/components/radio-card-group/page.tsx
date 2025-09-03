import { radioCardGroupConfig } from "@patternmode/radio-card-group/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={radioCardGroupConfig.badge}
        description={radioCardGroupConfig.description}
        title={radioCardGroupConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={radioCardGroupConfig.category}
        componentId="radio-card-group"
        componentName={radioCardGroupConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="radio-card-group" />
    </div>
  );
}
