import { selectConfig } from "@patternmode/select/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${selectConfig.name} | Patternmode`,
  description: selectConfig.description,
  openGraph: {
    title: `${selectConfig.name} | Patternmode`,
    description: selectConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${selectConfig.name} | Patternmode`,
    description: selectConfig.description,
  },
};

export default function SelectPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={selectConfig.badge}
        description={selectConfig.description}
        title={selectConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={selectConfig.category}
        componentId="select"
        componentName={selectConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="select" />
    </div>
  );
}
