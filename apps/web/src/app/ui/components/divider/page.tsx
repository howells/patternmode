import { dividerConfig } from "@patternmode/ui/components/divider/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${dividerConfig.name} | Patternmode`,
  description: dividerConfig.description,
  openGraph: {
    title: `${dividerConfig.name} | Patternmode`,
    description: dividerConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${dividerConfig.name} | Patternmode`,
    description: dividerConfig.description,
  },
};

export default function DividerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={dividerConfig.name}
        description={dividerConfig.description}
        badge={dividerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="divider"
        componentName={dividerConfig.name}
        category={dividerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="divider" />
    </div>
  );
}
