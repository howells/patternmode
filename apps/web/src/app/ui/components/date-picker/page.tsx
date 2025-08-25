import type { Metadata } from "next";

import { datePickerConfig } from "@patternmode/date-picker/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${datePickerConfig.name} | Patternmode`,
  description: datePickerConfig.description,
  openGraph: {
    title: `${datePickerConfig.name} | Patternmode`,
    description: datePickerConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
