import { Separator } from "@patternmode/ui/components/separator";
import { kbdConfig } from "@patternmode/ui/components/kbd/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: kbdConfig.name,
  description: kbdConfig.description,
  openGraph: {
    title: kbdConfig.name,
    description: kbdConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: kbdConfig.name,
    description: kbdConfig.description,
  },
};

export default function KbdPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={kbdConfig.name}
        description={kbdConfig.description}
        badge={kbdConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="kbd"
        componentName={kbdConfig.name}
        category={kbdConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="kbd" />
    </div>
  );
}
