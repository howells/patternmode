import { Separator } from "@patternmode/separator";
import { textConfig } from "@patternmode/text/config";
import type { Metadata } from "next";

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
        badge={textConfig.badge}
        description={textConfig.description}
        title={textConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={textConfig.category}
        componentId="text"
        componentName={textConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="text" />
    </div>
  );
}
