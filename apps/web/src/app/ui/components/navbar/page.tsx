import { Separator } from "@patternmode/ui/components/separator";
import { navbarConfig } from "@patternmode/ui/components/navbar/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${navbarConfig.name} | Patternmode`,
  description: navbarConfig.description,
  openGraph: {
    title: `${navbarConfig.name} | Patternmode`,
    description: navbarConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${navbarConfig.name} | Patternmode`,
    description: navbarConfig.description,
  },
};

export default function NavbarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={navbarConfig.name}
        description={navbarConfig.description}
        badge={navbarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="navbar"
        componentName={navbarConfig.name}
        category={navbarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="navbar" />
    </div>
  );
}
