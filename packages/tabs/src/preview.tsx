"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./component";

export function TabsPreview() {
  return (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">First</TabsTrigger>
        <TabsTrigger value="b">Second</TabsTrigger>
      </TabsList>
      <TabsContent value="a">A content</TabsContent>
      <TabsContent value="b">B content</TabsContent>
    </Tabs>
  );
}

export const tabsPreviewProps = [];
