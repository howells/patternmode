import type { Metadata } from "next";

import { selectNativeConfig } from "@patternmode/ui/components/select-native/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${selectNativeConfig.name} | Patternmode`,
  description: selectNativeConfig.description,
  openGraph: {
    title: `${selectNativeConfig.name} | Patternmode`,
    description: selectNativeConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${selectNativeConfig.name} | Patternmode`,
    description: selectNativeConfig.description,
  },
};

export default function SelectNativePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={selectNativeConfig.name}
        description={selectNativeConfig.description}
        badge={selectNativeConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="select-native"
        componentName={selectNativeConfig.name}
        category={selectNativeConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="select-native" />
    </div>
  );
}
