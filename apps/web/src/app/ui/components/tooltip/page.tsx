import { Separator } from "@patternmode/ui/components/separator";
import { tooltipConfig } from "@patternmode/ui/components/tooltip/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
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
        title={tooltipConfig.name}
        description={tooltipConfig.description}
        badge={tooltipConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="tooltip"
        componentName={tooltipConfig.name}
        category={tooltipConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tooltip" />
    </div>
  );
}
