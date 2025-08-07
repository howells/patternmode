import { badgeConfig } from "@patternmode/ui/components/badge/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${badgeConfig.name} | Patternmode`,
  description: badgeConfig.description,
  openGraph: {
    title: `${badgeConfig.name} | Patternmode`,
    description: badgeConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${badgeConfig.name} | Patternmode`,
    description: badgeConfig.description,
  },
};

export default function BadgePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={badgeConfig.name}
        description={badgeConfig.description}
        badge={badgeConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="badge"
        componentName={badgeConfig.name}
        category={badgeConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="badge" />
    </div>
  );
}
