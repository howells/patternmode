import { splitButtonConfig } from "@patternmode/ui/components/split-button/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${splitButtonConfig.name} | Patternmode`,
  description: splitButtonConfig.description,
  openGraph: {
    title: `${splitButtonConfig.name} | Patternmode`,
    description: splitButtonConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${splitButtonConfig.name} | Patternmode`,
    description: splitButtonConfig.description,
  },
};

export default function SplitButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={splitButtonConfig.name}
        description={splitButtonConfig.description}
        badge={splitButtonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="split-button"
        componentName={splitButtonConfig.name}
        category={splitButtonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="split-button" />
    </div>
  );
}
