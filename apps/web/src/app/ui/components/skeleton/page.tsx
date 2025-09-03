import { Separator } from "@patternmode/separator";
import { skeletonConfig } from "@patternmode/skeleton/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${skeletonConfig.name} | Patternmode`,
  description: skeletonConfig.description,
  openGraph: {
    title: `${skeletonConfig.name} | Patternmode`,
    description: skeletonConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${skeletonConfig.name} | Patternmode`,
    description: skeletonConfig.description,
  },
};

export default function SkeletonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={skeletonConfig.badge}
        description={skeletonConfig.description}
        title={skeletonConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={skeletonConfig.category}
        componentId="skeleton"
        componentName={skeletonConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="skeleton" />
    </div>
  );
}
