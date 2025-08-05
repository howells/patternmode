import { Separator } from "@patternmode/ui/components/separator";
import { progressCircleConfig } from "@patternmode/ui/components/progress-circle/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${progressCircleConfig.name} | Patternmode`,
  description: progressCircleConfig.description,
  openGraph: {
    title: `${progressCircleConfig.name} | Patternmode`,
    description: progressCircleConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${progressCircleConfig.name} | Patternmode`,
    description: progressCircleConfig.description,
  },
};

export default function ProgressCirclePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={progressCircleConfig.name}
        description={progressCircleConfig.description}
        badge={progressCircleConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="progress-circle"
        componentName={progressCircleConfig.name}
        category={progressCircleConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="progress-circle" />
    </div>
  );
}
