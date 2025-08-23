import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { textListConfig } from "@patternmode/text-list/config";

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
        title={textListConfig.name}
        description={textListConfig.description}
        badge={textListConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="text-list"
        componentName={textListConfig.name}
        category={textListConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="text-list" />
    </div>
  );
}
