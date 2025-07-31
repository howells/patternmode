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
            <p>Extra small tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Analytics content</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Reports content</p>
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
            <p>Small tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Analytics content</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Reports content</p>
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
            <p>Default tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Analytics content</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Reports content</p>
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
            <p>Large tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Analytics content</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Reports content</p>
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
            <p>Extra small solid tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Content for Tab 3</p>
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
            <p>Small solid tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Content for Tab 3</p>
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
            <p>Default solid tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Content for Tab 3</p>
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
            <p>Large solid tabs content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p>Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p>Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
