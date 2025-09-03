import { breadcrumbsConfig } from "@patternmode/breadcrumbs/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${breadcrumbsConfig.name} | Patternmode`,
  description: breadcrumbsConfig.description,
  openGraph: {
    title: `${breadcrumbsConfig.name} | Patternmode`,
    description: breadcrumbsConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${breadcrumbsConfig.name} | Patternmode`,
    description: breadcrumbsConfig.description,
  },
};

export default function BreadcrumbsPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={breadcrumbsConfig.badge}
        description={breadcrumbsConfig.description}
        title={breadcrumbsConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={breadcrumbsConfig.category}
        componentId="breadcrumbs"
        componentName={breadcrumbsConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="breadcrumbs" />
    </div>
  );
}
