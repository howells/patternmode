import { Separator } from "@patternmode/separator";
import { toastConfig } from "@patternmode/toast/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${toastConfig.name} | Patternmode`,
  description: toastConfig.description,
  openGraph: {
    title: `${toastConfig.name} | Patternmode`,
    description: toastConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${toastConfig.name} | Patternmode`,
    description: toastConfig.description,
  },
};

export default function ToastPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={toastConfig.badge}
        description={toastConfig.description}
        title={toastConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={toastConfig.category}
        componentId="toast"
        componentName={toastConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toast" />
    </div>
  );
}
