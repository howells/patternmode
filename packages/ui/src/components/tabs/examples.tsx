import { Tabs, TabsContent, TabsList, TabsTrigger } from "@patternmode/ui";
import React from "react";

export function TabsExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant="line">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p>Overview content goes here</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Analytics content goes here</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p>Reports content goes here</p>
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
        <p>Overview content goes here</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Analytics content goes here</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p>Reports content goes here</p>
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
        <p>Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p>Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p>Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  );
}
