import { loaderConfig } from "@patternmode/loader/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={loaderConfig.badge}
        description={loaderConfig.description}
        title={loaderConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={loaderConfig.category}
        componentId="loader"
        componentName={loaderConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="loader" />
    </div>
  );
}
