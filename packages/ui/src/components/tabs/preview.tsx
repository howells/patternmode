"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@patternmode/ui";
import { BarChart3, FileText, Settings, Users } from "lucide-react";
import type { ButtonSize } from "../button/button";

export function TabsExample({
  defaultValue = "overview",
  variant = "line",
  size = "default",
  hideDivider = false,
  showIcons = false,
  ...props
}: {
  defaultValue?: string;
  variant?: "solid" | "line";
  size?: ButtonSize;
  hideDivider?: boolean;
  showIcons?: boolean;
} & React.ComponentProps<typeof Tabs>) {
  const icons = showIcons ? {
    overview: FileText,
    analytics: BarChart3,
    reports: Users,
    notifications: Settings,
  } : {};

  return (
    <Tabs defaultValue={defaultValue} {...props}>
      <TabsList variant={variant} size={size} hideDivider={hideDivider}>
        <TabsTrigger value="overview" leftIcon={icons.overview}>Overview</TabsTrigger>
        <TabsTrigger value="analytics" leftIcon={icons.analytics}>Analytics</TabsTrigger>
        <TabsTrigger value="reports" leftIcon={icons.reports}>Reports</TabsTrigger>
        <TabsTrigger value="notifications" leftIcon={icons.notifications}>Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6"></TabsContent>

      <TabsContent value="analytics" className="mt-6"></TabsContent>

      <TabsContent value="reports" className="mt-6"></TabsContent>

      <TabsContent value="notifications" className="mt-6"></TabsContent>
    </Tabs>
  );
}
