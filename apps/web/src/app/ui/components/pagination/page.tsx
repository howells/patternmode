import { paginationConfig } from "@patternmode/pagination/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={paginationConfig.badge}
        description={paginationConfig.description}
        title={paginationConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={paginationConfig.category}
        componentId="pagination"
        componentName={paginationConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="pagination" />
    </div>
  );
}
