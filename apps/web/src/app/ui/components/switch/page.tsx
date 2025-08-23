import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { switchConfig } from "@patternmode/ui/components/switch/config";

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
        title={switchConfig.name}
        description={switchConfig.description}
        badge={switchConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="switch"
        componentName={switchConfig.name}
        category={switchConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="switch" />
    </div>
  );
}
