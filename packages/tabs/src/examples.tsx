"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from ".";

export const DefaultExample = () => (
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Tab 1 content</TabsContent>
    <TabsContent value="tab2">Tab 2 content</TabsContent>
  </Tabs>
);

export const LineVariantExample = () => (
  <Tabs defaultValue="tab1">
    <TabsList variant="line">
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Tab 1 content</TabsContent>
    <TabsContent value="tab2">Tab 2 content</TabsContent>
  </Tabs>
);
