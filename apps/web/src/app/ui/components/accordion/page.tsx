import { accordionConfig } from "@patternmode/ui/components/accordion/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${accordionConfig.name} | Patternmode`,
  description: accordionConfig.description,
  openGraph: {
    title: `${accordionConfig.name} | Patternmode`,
    description: accordionConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${accordionConfig.name} | Patternmode`,
    description: accordionConfig.description,
  },
};

export default function AccordionPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={accordionConfig.name}
        description={accordionConfig.description}
        badge={accordionConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="accordion"
        componentName={accordionConfig.name}
        category={accordionConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="accordion" />
    </div>
  );
}
