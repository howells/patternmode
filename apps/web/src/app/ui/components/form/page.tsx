import { formConfig } from "@patternmode/form/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={formConfig.badge}
        description={formConfig.description}
        title={formConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={formConfig.category}
        componentId="form"
        componentName={formConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="form" />
    </div>
  );
}
