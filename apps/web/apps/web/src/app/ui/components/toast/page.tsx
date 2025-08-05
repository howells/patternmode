import { Separator } from "@patternmode/ui/components/separator";
import { toastConfig } from "@patternmode/ui/components/toast/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export default function ToastPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={toastConfig.name}
        description={toastConfig.description}
        badge={toastConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="toast"
        componentName={toastConfig.name}
        category={toastConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="toast" />
    </div>
  );
}
