import { dialogConfig } from "@patternmode/dialog/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${dialogConfig.name} | Patternmode`,
  description: dialogConfig.description,
  openGraph: {
    title: `${dialogConfig.name} | Patternmode`,
    description: dialogConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${dialogConfig.name} | Patternmode`,
    description: dialogConfig.description,
  },
};

export default function DialogPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={dialogConfig.badge}
        description={dialogConfig.description}
        title={dialogConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={dialogConfig.category}
        componentId="dialog"
        componentName={dialogConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dialog" />
    </div>
  );
}
