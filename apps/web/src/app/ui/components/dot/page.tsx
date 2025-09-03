import { dotConfig } from "@patternmode/dot/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${dotConfig.name} | Patternmode`,
  description: dotConfig.description,
  openGraph: {
    title: `${dotConfig.name} | Patternmode`,
    description: dotConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${dotConfig.name} | Patternmode`,
    description: dotConfig.description,
  },
};

export default function DotPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={dotConfig.badge}
        description={dotConfig.description}
        title={dotConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={dotConfig.category}
        componentId="dot"
        componentName={dotConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dot" />
    </div>
  );
}
