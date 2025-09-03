import { buttonConfig } from "@patternmode/button/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";
import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${buttonConfig.name} | Patternmode`,
  description: buttonConfig.description,
  openGraph: {
    title: `${buttonConfig.name} | Patternmode`,
    description: buttonConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${buttonConfig.name} | Patternmode`,
    description: buttonConfig.description,
  },
};

export default function ButtonPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={buttonConfig.badge}
        description={buttonConfig.description}
        title={buttonConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={buttonConfig.category}
        componentId="button"
        componentName={buttonConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="button" />
    </div>
  );
}
