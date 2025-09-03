import { selectNativeConfig } from "@patternmode/select-native/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={selectNativeConfig.badge}
        description={selectNativeConfig.description}
        title={selectNativeConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={selectNativeConfig.category}
        componentId="select-native"
        componentName={selectNativeConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="select-native" />
    </div>
  );
}
