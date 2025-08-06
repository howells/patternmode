import { loaderConfig } from "@patternmode/ui/components/loader/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
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
        title={loaderConfig.name}
        description={loaderConfig.description}
        badge={loaderConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="loader"
        componentName={loaderConfig.name}
        category={loaderConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="loader" />
    </div>
  );
}
