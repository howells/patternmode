import { emptyStateConfig } from "@patternmode/empty-state/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${emptyStateConfig.name} | Patternmode`,
  description: emptyStateConfig.description,
  openGraph: {
    title: `${emptyStateConfig.name} | Patternmode`,
    description: emptyStateConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${emptyStateConfig.name} | Patternmode`,
    description: emptyStateConfig.description,
  },
};

export default function EmptyStatePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={emptyStateConfig.badge}
        description={emptyStateConfig.description}
        title={emptyStateConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={emptyStateConfig.category}
        componentId="empty-state"
        componentName={emptyStateConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="empty-state" />
    </div>
  );
}
