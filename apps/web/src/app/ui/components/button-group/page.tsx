import type { Metadata } from "next";

import { buttonGroupConfig } from "@patternmode/ui/components/button-group/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={buttonGroupConfig.name}
        description={buttonGroupConfig.description}
        badge={buttonGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="button-group"
        componentName={buttonGroupConfig.name}
        category={buttonGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="button-group" />
    </div>
  );
}
