import type { Metadata } from "next";

import { kbdConfig } from "@patternmode/kbd/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${kbdConfig.name} | Patternmode`,
  description: kbdConfig.description,
  openGraph: {
    title: `${kbdConfig.name} | Patternmode`,
    description: kbdConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${kbdConfig.name} | Patternmode`,
    description: kbdConfig.description,
  },
};

export default function KbdPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={kbdConfig.name}
        description={kbdConfig.description}
        badge={kbdConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="kbd"
        componentName={kbdConfig.name}
        category={kbdConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="kbd" />
    </div>
  );
}
