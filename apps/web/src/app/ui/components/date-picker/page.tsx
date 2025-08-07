import { Separator } from "@patternmode/ui/components/separator";
import { datePickerConfig } from "@patternmode/ui/components/date-picker/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${datePickerConfig.name} | Patternmode`,
  description: datePickerConfig.description,
  openGraph: {
    title: `${datePickerConfig.name} | Patternmode`,
    description: datePickerConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${datePickerConfig.name} | Patternmode`,
    description: datePickerConfig.description,
  },
};

export default function DatePickerPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={datePickerConfig.name}
        description={datePickerConfig.description}
        badge={datePickerConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="date-picker"
        componentName={datePickerConfig.name}
        category={datePickerConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="date-picker" />
    </div>
  );
}
