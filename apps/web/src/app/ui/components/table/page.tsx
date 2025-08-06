import { Separator } from "@patternmode/ui/components/separator";
import { tableConfig } from "@patternmode/ui/components/table/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
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
        title={tableConfig.name}
        description={tableConfig.description}
        badge={tableConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="table"
        componentName={tableConfig.name}
        category={tableConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="table" />
    </div>
  );
}
