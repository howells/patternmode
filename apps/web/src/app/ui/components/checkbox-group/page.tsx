import { checkboxGroupConfig } from "@patternmode/checkbox-group/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${checkboxGroupConfig.name} | Patternmode`,
  description: checkboxGroupConfig.description,
  openGraph: {
    title: `${checkboxGroupConfig.name} | Patternmode`,
    description: checkboxGroupConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${checkboxGroupConfig.name} | Patternmode`,
    description: checkboxGroupConfig.description,
  },
};

export default function CheckboxGroupPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={checkboxGroupConfig.badge}
        description={checkboxGroupConfig.description}
        title={checkboxGroupConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={checkboxGroupConfig.category}
        componentId="checkbox-group"
        componentName={checkboxGroupConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="checkbox-group" />
    </div>
  );
}
