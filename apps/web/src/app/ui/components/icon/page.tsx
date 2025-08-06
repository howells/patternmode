import { iconConfig } from "@patternmode/ui/components/icon/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${iconConfig.name} | Patternmode`,
  description: iconConfig.description,
  openGraph: {
    title: `${iconConfig.name} | Patternmode`,
    description: iconConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${iconConfig.name} | Patternmode`,
    description: iconConfig.description,
  },
};

export default function IconPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={iconConfig.name}
        description={iconConfig.description}
        badge={iconConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="icon"
        componentName={iconConfig.name}
        category={iconConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="icon" />
    </div>
  );
}
