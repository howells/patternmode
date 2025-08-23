import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { sheetConfig } from "@patternmode/ui/components/sheet/config";

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
        title={sheetConfig.name}
        description={sheetConfig.description}
        badge={sheetConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="sheet"
        componentName={sheetConfig.name}
        category={sheetConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="sheet" />
    </div>
  );
}
