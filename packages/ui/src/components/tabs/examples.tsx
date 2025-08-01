"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { iconRegistry, Tabs, TabsContent, TabsList, TabsTrigger } from "@patternmode/ui";

import React from "react";

import { cx } from "../../lib/utils";
import { Text } from "../text/text";
// Pre-imported icons from registry
const { BarChart3, FileText, Settings, Users } = iconRegistry;

const TabTextContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className={cx("py-4")}>{children}</Text>
  );
};

export function TabsExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant="line">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <TabTextContent>Overview content goes here</TabTextContent>
      </TabsContent>
      <TabsContent value="tab2">
        <TabTextContent>Analytics content goes here</TabTextContent>
      </TabsContent>
      <TabsContent value="tab3">
        <TabTextContent>Reports content goes here</TabTextContent>
      </TabsContent>
    </Tabs>
  );
}

export function LineNoDividerExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant="line" hideDivider={true}>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <TabTextContent>Overview content goes here</TabTextContent>
      </TabsContent>
      <TabsContent value="tab2">
        <TabTextContent>Analytics content goes here</TabTextContent>
      </TabsContent>
      <TabsContent value="tab3">
        <TabTextContent>Reports content goes here</TabTextContent>
      </TabsContent>
    </Tabs>
  );
}

export function SolidExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant="solid">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <TabTextContent>Content for Tab 1</TabTextContent>
      </TabsContent>
      <TabsContent value="tab2">
        <TabTextContent>Content for Tab 2</TabTextContent>
      </TabsContent>
      <TabsContent value="tab3">
        <TabTextContent>Content for Tab 3</TabTextContent>
      </TabsContent>
    </Tabs>
  );
}

export function LineSizesExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Extra Small (xs) - h-8 text-xs</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="xs">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Extra small tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Analytics content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Reports content</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Small (sm) - h-10 text-xs</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="sm">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Small tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Analytics content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Reports content</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Default - h-12 text-sm</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="default">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Default tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Analytics content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Reports content</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Large (lg) - h-14 text-base</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="line" size="lg">
            <TabsTrigger value="tab1">Overview</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Large tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Analytics content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Reports content</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function SolidSizesExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Extra Small (xs)</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid" size="xs">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Extra small solid tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Content for Tab 2</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Content for Tab 3</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Small (sm)</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid" size="sm">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Small solid tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Content for Tab 2</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Content for Tab 3</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Default</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid" size="default">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Default solid tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Content for Tab 2</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Content for Tab 3</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium">Large (lg)</h3>
        <Tabs defaultValue="tab1">
          <TabsList variant="solid" size="lg">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <TabTextContent>Large solid tabs content</TabTextContent>
          </TabsContent>
          <TabsContent value="tab2">
            <TabTextContent>Content for Tab 2</TabTextContent>
          </TabsContent>
          <TabsContent value="tab3">
            <TabTextContent>Content for Tab 3</TabTextContent>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function LineIndicatorTestExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant="line">
        <TabsTrigger value="tab1">Short</TabsTrigger>
        <TabsTrigger value="tab2">Medium Length</TabsTrigger>
        <TabsTrigger value="tab3">Very Long Tab Name</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <TabTextContent>The indicator should be under "Short"</TabTextContent>
      </TabsContent>
      <TabsContent value="tab2">
        <TabTextContent>The indicator should be under "Medium Length"</TabTextContent>
      </TabsContent>
      <TabsContent value="tab3">
        <TabTextContent>The indicator should be under "Very Long Tab Name"</TabTextContent>
      </TabsContent>
    </Tabs>
  );
}

export function LineWithIconsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview" leftIcon={FileText}>Overview</TabsTrigger>
        <TabsTrigger value="analytics" leftIcon={BarChart3}>Analytics</TabsTrigger>
        <TabsTrigger value="users" leftIcon={Users}>Users</TabsTrigger>
        <TabsTrigger value="settings" leftIcon={Settings}>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <TabTextContent>Overview content with icons in line variant</TabTextContent>
      </TabsContent>
      <TabsContent value="analytics">
        <TabTextContent>Analytics content</TabTextContent>
      </TabsContent>
      <TabsContent value="users">
        <TabTextContent>Users content</TabTextContent>
      </TabsContent>
      <TabsContent value="settings">
        <TabTextContent>Settings content</TabTextContent>
      </TabsContent>
    </Tabs>
  );
}

export function SolidWithIconsExample() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="solid">
        <TabsTrigger value="overview" leftIcon={FileText}>Overview</TabsTrigger>
        <TabsTrigger value="analytics" leftIcon={BarChart3}>Analytics</TabsTrigger>
        <TabsTrigger value="users" leftIcon={Users}>Users</TabsTrigger>
        <TabsTrigger value="settings" leftIcon={Settings}>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <TabTextContent>Overview content with icons in solid variant</TabTextContent>
      </TabsContent>
      <TabsContent value="analytics">
        <TabTextContent>Analytics content</TabTextContent>
      </TabsContent>
      <TabsContent value="users">
        <TabTextContent>Users content</TabTextContent>
      </TabsContent>
      <TabsContent value="settings">
        <TabTextContent>Settings content</TabTextContent>
      </TabsContent>
    </Tabs>
  );
}

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "TabsExample",
    title: "Tabs",
    description: "Tabs example",
    component: TabsExample,
  },
  {
    id: "LineNoDividerExample",
    title: "Line No Divider",
    description: "Line No Divider example",
    component: LineNoDividerExample,
  },
  {
    id: "SolidExample",
    title: "Solid",
    description: "Solid example",
    component: SolidExample,
  },
  {
    id: "LineSizesExample",
    title: "Line Sizes",
    description: "Line Sizes example",
    component: LineSizesExample,
  },
  {
    id: "SolidSizesExample",
    title: "Solid Sizes",
    description: "Solid Sizes example",
    component: SolidSizesExample,
  },
  {
    id: "LineIndicatorTestExample",
    title: "Line Indicator Test",
    description: "Line Indicator Test example",
    component: LineIndicatorTestExample,
  },
  {
    id: "LineWithIconsExample",
    title: "Line With Icons",
    description: "Line With Icons example",
    component: LineWithIconsExample,
  },
  {
    id: "SolidWithIconsExample",
    title: "Solid With Icons",
    description: "Solid With Icons example",
    component: SolidWithIconsExample,
  },
];
