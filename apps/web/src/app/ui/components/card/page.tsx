import { cardConfig } from "@patternmode/card/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${cardConfig.name} | Patternmode`,
  description: cardConfig.description,
  openGraph: {
    title: `${cardConfig.name} | Patternmode`,
    description: cardConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${cardConfig.name} | Patternmode`,
    description: cardConfig.description,
  },
};

export default function CardPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={cardConfig.badge}
        description={cardConfig.description}
        title={cardConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={cardConfig.category}
        componentId="card"
        componentName={cardConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="card" />
    </div>
  );
}
