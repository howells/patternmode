import { Separator } from "@patternmode/ui/components/separator";
import { alertDialogConfig } from "@patternmode/ui/components/alert-dialog/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

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
