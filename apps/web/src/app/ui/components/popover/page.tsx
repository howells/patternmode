import type { Metadata } from "next";

import { popoverConfig } from "@patternmode/ui/components/popover/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={popoverConfig.name}
        description={popoverConfig.description}
        badge={popoverConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="popover"
        componentName={popoverConfig.name}
        category={popoverConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="popover" />
    </div>
  );
}
