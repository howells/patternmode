import type { Metadata } from "next";

import { formConfig } from "@patternmode/form/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${formConfig.name} | Patternmode`,
  description: formConfig.description,
  openGraph: {
    title: `${formConfig.name} | Patternmode`,
    description: formConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${formConfig.name} | Patternmode`,
    description: formConfig.description,
  },
};

export default function FormPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={formConfig.name}
        description={formConfig.description}
        badge={formConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="form"
        componentName={formConfig.name}
        category={formConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="form" />
    </div>
  );
}
