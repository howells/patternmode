import type { Metadata } from "next";

import { Separator } from "@patternmode/separator";
import { textareaConfig } from "@patternmode/textarea/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${textareaConfig.name} | Patternmode`,
  description: textareaConfig.description,
  openGraph: {
    title: `${textareaConfig.name} | Patternmode`,
    description: textareaConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${textareaConfig.name} | Patternmode`,
    description: textareaConfig.description,
  },
};

export default function TextareaPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={textareaConfig.name}
        description={textareaConfig.description}
        badge={textareaConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="textarea"
        componentName={textareaConfig.name}
        category={textareaConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="textarea" />
    </div>
  );
}
