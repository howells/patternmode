import type { Metadata } from "next";

import { selectConfig } from "@patternmode/ui/components/select/config";
import { Separator } from "@patternmode/separator";

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
        title={selectConfig.name}
        description={selectConfig.description}
        badge={selectConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="select"
        componentName={selectConfig.name}
        category={selectConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="select" />
    </div>
  );
}
