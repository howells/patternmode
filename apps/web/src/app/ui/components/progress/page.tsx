import type { Metadata } from "next";

import { progressConfig } from "@patternmode/ui/components/progress/config";
import { Separator } from "@patternmode/separator";

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
        title={progressConfig.name}
        description={progressConfig.description}
        badge={progressConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="progress"
        componentName={progressConfig.name}
        category={progressConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="progress" />
    </div>
  );
}
