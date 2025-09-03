import { checkboxConfig } from "@patternmode/checkbox/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${checkboxConfig.name} | Patternmode`,
  description: checkboxConfig.description,
  openGraph: {
    title: `${checkboxConfig.name} | Patternmode`,
    description: checkboxConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${checkboxConfig.name} | Patternmode`,
    description: checkboxConfig.description,
  },
};

export default function CheckboxPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={checkboxConfig.badge}
        description={checkboxConfig.description}
        title={checkboxConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={checkboxConfig.category}
        componentId="checkbox"
        componentName={checkboxConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="checkbox" />
    </div>
  );
}
