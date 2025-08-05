"use client";

import React from "react";
import { Button } from "../button/component";
import { Text } from "../text/component";
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
  size?: "xs" | "sm" | "default" | "lg";
  /**
   * Default tab to display.
   * Determines which tab is initially active.
   */
  defaultValue?: "tab1" | "tab2" | "tab3";
  /**
   * Show button alignment example.
   * Demonstrates how to align buttons with solid tabs.
   */
  showButtonAlignment?: boolean;
};

export function TabsPreview({
  variant = "line",
  hideDivider = false,
  size = "default",
  defaultValue = "tab1",
  showButtonAlignment = false,
}: TabsPreviewProps = {}) {
  return (
    <div className="">
      <Tabs defaultValue={defaultValue}>
        <div className="flex items-center gap-3">
          <TabsList variant={variant} hideDivider={hideDivider} size={size}>
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>

          {/* Show button alignment example for solid variant */}
          {showButtonAlignment && variant === "solid" && (
            <>
              <Button size={size} variant="outline">
                Regular Button
              </Button>
              <Button size={size} variant="outline">
                Another Button
              </Button>
            </>
          )}
        </div>

        <TabsContent value="tab1" className="py-4">
          <Text>
            Overview content goes here. This tab shows general information and metrics.
          </Text>
        </TabsContent>
        <TabsContent value="tab2" className="py-4">
          <Text>
            Analytics content goes here. This tab displays detailed analytics and insights.
          </Text>
        </TabsContent>
        <TabsContent value="tab3" className="py-4">
          <Text>
            Reports content goes here. This tab contains various reports and data exports.
          </Text>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Preview props for prop explorer
export const tabsPreviewProps = [
  {
    name: "variant",
    type: "select",
    description: "Tabs style variant - controls the visual appearance of the tab triggers.",
    options: ["solid", "line"],
    defaultValue: "line",
  },
  {
    name: "size",
    type: "select",
    description: "Tabs size variant - affects padding and text size of the tab triggers.",
    options: ["xs", "sm", "default", "lg"],
    defaultValue: "default",
  },
  {
    name: "hideDivider",
    type: "boolean",
    description: "Hide the bottom divider line (only applies to line variant).",
    defaultValue: false,
  },
  {
    name: "showButtonAlignment",
    type: "boolean",
    description: "Show buttons next to tabs.",
    defaultValue: false,
  },
  {
    name: "defaultValue",
    type: "select",
    description: "Default tab to display.",
    options: ["tab1", "tab2", "tab3"],
    defaultValue: "tab1",
  },
];
