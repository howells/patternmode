import { Separator } from "@patternmode/separator";
import { tooltipConfig } from "@patternmode/tooltip/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${tooltipConfig.name} | Patternmode`,
  description: tooltipConfig.description,
  openGraph: {
    title: `${tooltipConfig.name} | Patternmode`,
    description: tooltipConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tooltipConfig.name} | Patternmode`,
    description: tooltipConfig.description,
  },
};

export default function TooltipPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={tooltipConfig.badge}
        description={tooltipConfig.description}
        title={tooltipConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={tooltipConfig.category}
        componentId="tooltip"
        componentName={tooltipConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tooltip" />
    </div>
  );
}
