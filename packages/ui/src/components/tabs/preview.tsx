"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./component";

export type TabsPreviewProps = {
  /**
   * Style variant for the tabs list.
   * "solid" creates button-like tabs in a container, "line" creates underlined tabs with a divider.
   */
  variant?: "solid" | "line";
  /**
   * Hide the bottom divider line (only applies to "line" variant).
   * Controls visibility of the dividing line under tabs.
   */
  hideDivider?: boolean;
  /**
   * Size variant for tabs (applies to "solid" variant).
   * Controls the size of button-style tabs.
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Default tab to display.
   * Determines which tab is initially active.
   */
  defaultValue?: "tab1" | "tab2" | "tab3";
};

export function TabsExample({
  variant = "line",
  hideDivider = false,
  size = "sm",
  defaultValue = "tab1",
}: TabsPreviewProps = {}) {
  return (
    <div className="p-8">
      <Tabs defaultValue={defaultValue}>
        <TabsList variant={variant} hideDivider={hideDivider} size={size}>
          <TabsTrigger value="tab1">Overview</TabsTrigger>
          <TabsTrigger value="tab2">Analytics</TabsTrigger>
          <TabsTrigger value="tab3">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
            Overview content goes here. This tab shows general information and metrics.
          </div>
        </TabsContent>
        <TabsContent value="tab2">
          <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
            Analytics content goes here. This tab displays detailed analytics and insights.
          </div>
        </TabsContent>
        <TabsContent value="tab3">
          <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
            Reports content goes here. This tab contains various reports and data exports.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Preview props for prop explorer
export const TabsPreviewProps = [
  {
    name: "orientation",
    type: "select",
    description: "Tabs orientation layout - controls whether tabs are arranged horizontally or vertically.",
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
  },
  {
    name: "variant",
    type: "select",
    description: "Tabs style variant - controls the visual appearance of the tab triggers.",
    options: ["default", "pills", "underline"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    description: "Tabs size variant - affects padding and text size of the tab triggers.",
    options: ["sm", "default", "lg"],
    defaultValue: "default",
  },
  {
    name: "tabCount",
    type: "select",
    description: "Number of tabs to display - controls how many tab panels are shown.",
    options: [2, 3, 4],
    defaultValue: 3,
  },
  {
    name: "showContentVariation",
    type: "boolean",
    description: "Whether to show varied content in each tab - demonstrates different content types when enabled.",
    defaultValue: true,
  },
];
