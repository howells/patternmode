import { kbdConfig } from "@patternmode/kbd/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={kbdConfig.badge}
        description={kbdConfig.description}
        title={kbdConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={kbdConfig.category}
        componentId="kbd"
        componentName={kbdConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="kbd" />
    </div>
  );
}
