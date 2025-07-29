"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@patternmode/ui";

export function TabsExample({
  defaultValue = "overview",
  variant = "line",
  size = "default",
  hideDivider = false,
  ...props
}: {
  defaultValue?: string;
  variant?: "solid" | "line";
  size?: "default" | "sm" | "lg";
  hideDivider?: boolean;
} & React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs defaultValue={defaultValue} {...props}>
      <TabsList variant={variant} size={size} hideDivider={hideDivider}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6"></TabsContent>

      <TabsContent value="analytics" className="mt-6"></TabsContent>

      <TabsContent value="reports" className="mt-6"></TabsContent>

      <TabsContent value="notifications" className="mt-6"></TabsContent>
    </Tabs>
  );
}
