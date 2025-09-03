import { buttonGroupConfig } from "@patternmode/button-group/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${buttonGroupConfig.name} | Patternmode`,
  description: buttonGroupConfig.description,
  openGraph: {
    title: `${buttonGroupConfig.name} | Patternmode`,
    description: buttonGroupConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${buttonGroupConfig.name} | Patternmode`,
    description: buttonGroupConfig.description,
  },
};

export default function ButtonGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={buttonGroupConfig.badge}
        description={buttonGroupConfig.description}
        title={buttonGroupConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={buttonGroupConfig.category}
        componentId="button-group"
        componentName={buttonGroupConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="button-group" />
    </div>
  );
}
