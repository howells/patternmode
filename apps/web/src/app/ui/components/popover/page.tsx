import { popoverConfig } from "@patternmode/popover/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${popoverConfig.name} | Patternmode`,
  description: popoverConfig.description,
  openGraph: {
    title: `${popoverConfig.name} | Patternmode`,
    description: popoverConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${popoverConfig.name} | Patternmode`,
    description: popoverConfig.description,
  },
};

export default function PopoverPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={popoverConfig.badge}
        description={popoverConfig.description}
        title={popoverConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={popoverConfig.category}
        componentId="popover"
        componentName={popoverConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="popover" />
    </div>
  );
}
