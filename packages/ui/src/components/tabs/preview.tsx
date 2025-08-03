"use client";

import type { TabsProps } from "./component";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./component";

export function TabsExample(props: TabsProps) {
  return (
    <Tabs defaultValue="tab1" {...props}>
      <TabsList variant="line">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
          Overview content goes here
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
          Analytics content goes here
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">
          Reports content goes here
        </div>
      </TabsContent>
    </Tabs>
  );
}
