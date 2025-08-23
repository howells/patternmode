import type { Metadata } from "next";

import { calendarConfig } from "@patternmode/ui/components/calendar/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${calendarConfig.name} | Patternmode`,
  description: calendarConfig.description,
  openGraph: {
    title: `${calendarConfig.name} | Patternmode`,
    description: calendarConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${calendarConfig.name} | Patternmode`,
    description: calendarConfig.description,
  },
};

export default function CalendarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={calendarConfig.name}
        description={calendarConfig.description}
        badge={calendarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="calendar"
        componentName={calendarConfig.name}
        category={calendarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="calendar" />
    </div>
  );
}
