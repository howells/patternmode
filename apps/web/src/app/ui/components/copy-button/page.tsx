import type { Metadata } from "next";

import { copyButtonConfig } from "@patternmode/ui/components/copy-button/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${copyButtonConfig.name} | Patternmode`,
  description: copyButtonConfig.description,
  openGraph: {
    title: `${copyButtonConfig.name} | Patternmode`,
    description: copyButtonConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${copyButtonConfig.name} | Patternmode`,
    description: copyButtonConfig.description,
  },
};

export default function CopyButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={copyButtonConfig.name}
        description={copyButtonConfig.description}
        badge={copyButtonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="copy-button"
        componentName={copyButtonConfig.name}
        category={copyButtonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="copy-button" />
    </div>
  );
}
