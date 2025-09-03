import { Separator } from "@patternmode/separator";
import { switchConfig } from "@patternmode/switch/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${switchConfig.name} | Patternmode`,
  description: switchConfig.description,
  openGraph: {
    title: `${switchConfig.name} | Patternmode`,
    description: switchConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${switchConfig.name} | Patternmode`,
    description: switchConfig.description,
  },
};

export default function SwitchPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={switchConfig.badge}
        description={switchConfig.description}
        title={switchConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={switchConfig.category}
        componentId="switch"
        componentName={switchConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="switch" />
    </div>
  );
}
