import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { textConfig } from "@patternmode/text/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${textConfig.name} | Patternmode`,
  description: textConfig.description,
  openGraph: {
    title: `${textConfig.name} | Patternmode`,
    description: textConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${textConfig.name} | Patternmode`,
    description: textConfig.description,
  },
};

export default function TextPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={textConfig.name}
        description={textConfig.description}
        badge={textConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="text"
        componentName={textConfig.name}
        category={textConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="text" />
    </div>
  );
}
