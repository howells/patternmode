import type { Metadata } from "next";

import { paginationConfig } from "@patternmode/pagination/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${paginationConfig.name} | Patternmode`,
  description: paginationConfig.description,
  openGraph: {
    title: `${paginationConfig.name} | Patternmode`,
    description: paginationConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${paginationConfig.name} | Patternmode`,
    description: paginationConfig.description,
  },
};

export default function PaginationPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={paginationConfig.name}
        description={paginationConfig.description}
        badge={paginationConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="pagination"
        componentName={paginationConfig.name}
        category={paginationConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="pagination" />
    </div>
  );
}
