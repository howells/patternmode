import type { Metadata } from "next";

import { comboboxConfig } from "@patternmode/combobox/config";
import { Separator } from "@patternmode/separator";

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
        title={comboboxConfig.name}
        description={comboboxConfig.description}
        badge={comboboxConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="combobox"
        componentName={comboboxConfig.name}
        category={comboboxConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="combobox" />
    </div>
  );
}
