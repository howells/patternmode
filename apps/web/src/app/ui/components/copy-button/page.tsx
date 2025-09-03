import { copyButtonConfig } from "@patternmode/copy-button/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={copyButtonConfig.badge}
        description={copyButtonConfig.description}
        title={copyButtonConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={copyButtonConfig.category}
        componentId="copy-button"
        componentName={copyButtonConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="copy-button" />
    </div>
  );
}
