import { Separator } from "@patternmode/separator";
import { sheetConfig } from "@patternmode/sheet/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${sheetConfig.name} | Patternmode`,
  description: sheetConfig.description,
  openGraph: {
    title: `${sheetConfig.name} | Patternmode`,
    description: sheetConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${sheetConfig.name} | Patternmode`,
    description: sheetConfig.description,
  },
};

export default function SheetPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={sheetConfig.badge}
        description={sheetConfig.description}
        title={sheetConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={sheetConfig.category}
        componentId="sheet"
        componentName={sheetConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="sheet" />
    </div>
  );
}
