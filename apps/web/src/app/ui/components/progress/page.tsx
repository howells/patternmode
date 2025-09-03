import { progressConfig } from "@patternmode/progress/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${progressConfig.name} | Patternmode`,
  description: progressConfig.description,
  openGraph: {
    title: `${progressConfig.name} | Patternmode`,
    description: progressConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${progressConfig.name} | Patternmode`,
    description: progressConfig.description,
  },
};

export default function ProgressPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={progressConfig.badge}
        description={progressConfig.description}
        title={progressConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={progressConfig.category}
        componentId="progress"
        componentName={progressConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="progress" />
    </div>
  );
}
