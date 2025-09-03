import { scrollAreaConfig } from "@patternmode/scroll-area/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
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
        badge={scrollAreaConfig.badge}
        description={scrollAreaConfig.description}
        title={scrollAreaConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={scrollAreaConfig.category}
        componentId="scroll-area"
        componentName={scrollAreaConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="scroll-area" />
    </div>
  );
}
