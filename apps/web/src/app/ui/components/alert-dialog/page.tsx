import { alertDialogConfig } from "@patternmode/alert-dialog/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${alertDialogConfig.name} | Patternmode`,
  description: alertDialogConfig.description,
  openGraph: {
    title: `${alertDialogConfig.name} | Patternmode`,
    description: alertDialogConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${alertDialogConfig.name} | Patternmode`,
    description: alertDialogConfig.description,
  },
};

export default function AlertDialogPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={alertDialogConfig.badge}
        description={alertDialogConfig.description}
        title={alertDialogConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={alertDialogConfig.category}
        componentId="alert-dialog"
        componentName={alertDialogConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="alert-dialog" />
    </div>
  );
}
