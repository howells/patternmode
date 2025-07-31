"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@patternmode/ui";
import type { ButtonSize } from "../button/button";

export function TabsExample({
  defaultValue = "overview",
  variant = "line",
  size = "default",
  hideDivider = false,
  ...props
}: {
  defaultValue?: string;
  variant?: "solid" | "line";
  size?: ButtonSize;
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

      <TabsContent value="overview"></TabsContent>

      <TabsContent value="analytics"></TabsContent>

      <TabsContent value="reports" ></TabsContent>

      <TabsContent value="notifications"></TabsContent>
    </Tabs>
  );
}
