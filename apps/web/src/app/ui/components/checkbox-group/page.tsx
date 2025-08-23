import type { Metadata } from "next";

import { checkboxGroupConfig } from "@patternmode/ui/components/checkbox-group/config";
import { Separator } from "@patternmode/separator";

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
        title={checkboxGroupConfig.name}
        description={checkboxGroupConfig.description}
        badge={checkboxGroupConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="checkbox-group"
        componentName={checkboxGroupConfig.name}
        category={checkboxGroupConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="checkbox-group" />
    </div>
  );
}
