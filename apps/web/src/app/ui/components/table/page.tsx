import { Separator } from "@patternmode/separator";
import { tableConfig } from "@patternmode/table/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${tableConfig.name} | Patternmode`,
  description: tableConfig.description,
  openGraph: {
    title: `${tableConfig.name} | Patternmode`,
    description: tableConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${tableConfig.name} | Patternmode`,
    description: tableConfig.description,
  },
};

export default function TablePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={tableConfig.badge}
        description={tableConfig.description}
        title={tableConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={tableConfig.category}
        componentId="table"
        componentName={tableConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="table" />
    </div>
  );
}
