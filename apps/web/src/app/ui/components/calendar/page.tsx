import { calendarConfig } from "@patternmode/calendar/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={calendarConfig.badge}
        description={calendarConfig.description}
        title={calendarConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={calendarConfig.category}
        componentId="calendar"
        componentName={calendarConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="calendar" />
    </div>
  );
}
