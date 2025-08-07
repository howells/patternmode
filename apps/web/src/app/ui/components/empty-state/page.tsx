import type { Metadata } from "next";

import { emptyStateConfig } from "@patternmode/ui/components/empty-state/config";
import { Separator } from "@patternmode/ui/components/separator";

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
        title={emptyStateConfig.name}
        description={emptyStateConfig.description}
        badge={emptyStateConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="empty-state"
        componentName={emptyStateConfig.name}
        category={emptyStateConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="empty-state" />
    </div>
  );
}
