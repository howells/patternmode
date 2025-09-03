import { progressCircleConfig } from "@patternmode/progress-circle/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${progressCircleConfig.name} | Patternmode`,
  description: progressCircleConfig.description,
  openGraph: {
    title: `${progressCircleConfig.name} | Patternmode`,
    description: progressCircleConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${progressCircleConfig.name} | Patternmode`,
    description: progressCircleConfig.description,
  },
};

export default function ProgressCirclePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={progressCircleConfig.badge}
        description={progressCircleConfig.description}
        title={progressCircleConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={progressCircleConfig.category}
        componentId="progress-circle"
        componentName={progressCircleConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="progress-circle" />
    </div>
  );
}
