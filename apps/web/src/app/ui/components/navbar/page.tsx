import { navbarConfig } from "@patternmode/navbar/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${navbarConfig.name} | Patternmode`,
  description: navbarConfig.description,
  openGraph: {
    title: `${navbarConfig.name} | Patternmode`,
    description: navbarConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${navbarConfig.name} | Patternmode`,
    description: navbarConfig.description,
  },
};

export default function NavbarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={navbarConfig.badge}
        description={navbarConfig.description}
        title={navbarConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={navbarConfig.category}
        componentId="navbar"
        componentName={navbarConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="navbar" />
    </div>
  );
}
