import { Separator } from "@patternmode/separator";
import { textareaConfig } from "@patternmode/textarea/config";
import type { Metadata } from "next";

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
        badge={textareaConfig.badge}
        description={textareaConfig.description}
        title={textareaConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={textareaConfig.category}
        componentId="textarea"
        componentName={textareaConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="textarea" />
    </div>
  );
}
