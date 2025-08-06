import { Separator } from "@patternmode/ui/components/separator";
import { trackerConfig } from "@patternmode/ui/components/tracker/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${trackerConfig.name} | Patternmode`,
  description: trackerConfig.description,
  openGraph: {
    title: `${trackerConfig.name} | Patternmode`,
    description: trackerConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${trackerConfig.name} | Patternmode`,
    description: trackerConfig.description,
  },
};

export default function TrackerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={trackerConfig.name}
        description={trackerConfig.description}
        badge={trackerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="tracker"
        componentName={trackerConfig.name}
        category={trackerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="tracker" />
    </div>
  );
}
