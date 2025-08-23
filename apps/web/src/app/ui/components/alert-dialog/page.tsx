import type { Metadata } from "next";

import { alertDialogConfig } from "@patternmode/ui/components/alert-dialog/config";
import { Separator } from "@patternmode/separator";

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
        title={alertDialogConfig.name}
        description={alertDialogConfig.description}
        badge={alertDialogConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="alert-dialog"
        componentName={alertDialogConfig.name}
        category={alertDialogConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="alert-dialog" />
    </div>
  );
}
