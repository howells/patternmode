import type { Metadata } from "next";

import { breadcrumbsConfig } from "@patternmode/ui/components/breadcrumbs/config";
import { Separator } from "@patternmode/separator";

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
        title={breadcrumbsConfig.name}
        description={breadcrumbsConfig.description}
        badge={breadcrumbsConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="breadcrumbs"
        componentName={breadcrumbsConfig.name}
        category={breadcrumbsConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="breadcrumbs" />
    </div>
  );
}
