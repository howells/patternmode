import { scrollAreaConfig } from "@patternmode/ui/components/scroll-area/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${scrollAreaConfig.name} | Patternmode`,
  description: scrollAreaConfig.description,
  openGraph: {
    title: `${scrollAreaConfig.name} | Patternmode`,
    description: scrollAreaConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${scrollAreaConfig.name} | Patternmode`,
    description: scrollAreaConfig.description,
  },
};

export default function ScrollAreaPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={scrollAreaConfig.name}
        description={scrollAreaConfig.description}
        badge={scrollAreaConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="scroll-area"
        componentName={scrollAreaConfig.name}
        category={scrollAreaConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="scroll-area" />
    </div>
  );
}
