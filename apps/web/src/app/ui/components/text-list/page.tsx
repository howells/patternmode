import { Separator } from "@patternmode/separator";
import { textListConfig } from "@patternmode/text-list/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${textListConfig.name} | Patternmode`,
  description: textListConfig.description,
  openGraph: {
    title: `${textListConfig.name} | Patternmode`,
    description: textListConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${textListConfig.name} | Patternmode`,
    description: textListConfig.description,
  },
};

export default function TextListPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={textListConfig.badge}
        description={textListConfig.description}
        title={textListConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={textListConfig.category}
        componentId="text-list"
        componentName={textListConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="text-list" />
    </div>
  );
}
