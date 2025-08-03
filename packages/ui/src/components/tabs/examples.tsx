"use client";

import { BarChart3, FileText, Settings, Users } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./component";

const TabTextContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-4 text-sm text-zinc-600 dark:text-zinc-400">{children}</div>
  );
};

export const DefaultExample = () => {
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
};

export const SolidExample = () => {
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
};

export const WithIconsExample = () => {
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
};

export const SizesExample = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Extra Small (xs)</h3>
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
        <h3 className="mb-4 text-sm font-medium">Small (sm)</h3>
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
        <h3 className="mb-4 text-sm font-medium">Default</h3>
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
        <h3 className="mb-4 text-sm font-medium">Large (lg)</h3>
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
};

export const SolidSizesExample = () => {
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
};

export const NoDividerExample = () => {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant="line" hideDivider={true}>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <TabTextContent>Overview content with no divider</TabTextContent>
      </TabsContent>
      <TabsContent value="tab2">
        <TabTextContent>Analytics content</TabTextContent>
      </TabsContent>
      <TabsContent value="tab3">
        <TabTextContent>Reports content</TabTextContent>
      </TabsContent>
    </Tabs>
  );
};
