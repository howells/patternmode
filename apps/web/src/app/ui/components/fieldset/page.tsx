import type { Metadata } from "next";

import { fieldsetConfig } from "@patternmode/fieldset/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${fieldsetConfig.name} | Patternmode`,
  description: fieldsetConfig.description,
  openGraph: {
    title: `${fieldsetConfig.name} | Patternmode`,
    description: fieldsetConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${fieldsetConfig.name} | Patternmode`,
    description: fieldsetConfig.description,
  },
};

export default function FieldsetPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={fieldsetConfig.name}
        description={fieldsetConfig.description}
        badge={fieldsetConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="fieldset"
        componentName={fieldsetConfig.name}
        category={fieldsetConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="fieldset" />
    </div>
  );
}
