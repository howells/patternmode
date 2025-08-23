import type { Metadata } from "next";

import { loaderConfig } from "@patternmode/loader/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${loaderConfig.name} | Patternmode`,
  description: loaderConfig.description,
  openGraph: {
    title: `${loaderConfig.name} | Patternmode`,
    description: loaderConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${loaderConfig.name} | Patternmode`,
    description: loaderConfig.description,
  },
};

export default function LoaderPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={loaderConfig.name}
        description={loaderConfig.description}
        badge={loaderConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="loader"
        componentName={loaderConfig.name}
        category={loaderConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="loader" />
    </div>
  );
}
