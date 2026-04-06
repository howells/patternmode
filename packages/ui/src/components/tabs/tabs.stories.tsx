import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs-root";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Tabs className="w-[40rem]" defaultValue="primitives">
      <TabsList>
        <TabsTrigger value="primitives">Primitives</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="boundaries">Boundaries</TabsTrigger>
      </TabsList>
      <TabsContent value="primitives">
        Buttons, fields, surfaces, and navigation stay shared.
      </TabsContent>
      <TabsContent value="tokens">
        Accent, density, typography, and radius shifts happen in tokens.
      </TabsContent>
      <TabsContent value="boundaries">
        Workflow-heavy compositions still belong to the app.
      </TabsContent>
    </Tabs>
  ),
};
