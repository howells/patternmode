import { comboboxConfig } from "@patternmode/combobox/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${comboboxConfig.name} | Patternmode`,
  description: comboboxConfig.description,
  openGraph: {
    title: `${comboboxConfig.name} | Patternmode`,
    description: comboboxConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${comboboxConfig.name} | Patternmode`,
    description: comboboxConfig.description,
  },
};

export default function ComboboxPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={comboboxConfig.badge}
        description={comboboxConfig.description}
        title={comboboxConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={comboboxConfig.category}
        componentId="combobox"
        componentName={comboboxConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="combobox" />
    </div>
  );
}
