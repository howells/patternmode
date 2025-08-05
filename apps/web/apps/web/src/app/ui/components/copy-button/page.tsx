import { Separator } from "@patternmode/ui/components/separator";
import { copyButtonConfig } from "@patternmode/ui/components/copy-button/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: copyButtonConfig.name,
  description: copyButtonConfig.description,
  openGraph: {
    title: copyButtonConfig.name,
    description: copyButtonConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: copyButtonConfig.name,
    description: copyButtonConfig.description,
  },
};

export default function CopyButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={copyButtonConfig.name}
        description={copyButtonConfig.description}
        badge={copyButtonConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="copy-button"
        componentName={copyButtonConfig.name}
        category={copyButtonConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="copy-button" />
    </div>
  );
}
