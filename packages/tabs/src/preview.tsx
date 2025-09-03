"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./component";

type TabsPreviewProps = {
  variant?: "solid" | "line";
  defaultValue?: string;
  showIndicator?: boolean;
};

export function TabsPreview({
  variant = "solid",
  defaultValue = "a",
  showIndicator = true,
}: TabsPreviewProps) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList showIndicator={showIndicator} variant={variant}>
        <TabsTrigger value="a">First</TabsTrigger>
        <TabsTrigger value="b">Second</TabsTrigger>
      </TabsList>
      <TabsContent value="a">A content</TabsContent>
      <TabsContent value="b">B content</TabsContent>
    </Tabs>
  );
}

export const tabsPreviewProps = [
  {
    name: "variant",
    type: "select",
    options: ["solid", "line"],
    defaultValue: "solid",
  },
  {
    name: "defaultValue",
    type: "select",
    options: ["a", "b"],
    defaultValue: "a",
  },
  { name: "showIndicator", type: "boolean", defaultValue: true },
];
