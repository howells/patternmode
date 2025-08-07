import { iconSelectConfig } from "@patternmode/ui/components/icon-select/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${iconSelectConfig.name} | Patternmode`,
  description: iconSelectConfig.description,
  openGraph: {
    title: `${iconSelectConfig.name} | Patternmode`,
    description: iconSelectConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${iconSelectConfig.name} | Patternmode`,
    description: iconSelectConfig.description,
  },
};

export default function IconSelectPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={iconSelectConfig.name}
        description={iconSelectConfig.description}
        badge={iconSelectConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="icon-select"
        componentName={iconSelectConfig.name}
        category={iconSelectConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon-select" />
    </div>
  );
}
