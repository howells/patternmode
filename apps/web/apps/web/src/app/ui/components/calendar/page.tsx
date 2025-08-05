import { Separator } from "@patternmode/ui/components/separator";
import { calendarConfig } from "@patternmode/ui/components/calendar/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: calendarConfig.name,
  description: calendarConfig.description,
  openGraph: {
    title: calendarConfig.name,
    description: calendarConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: calendarConfig.name,
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
