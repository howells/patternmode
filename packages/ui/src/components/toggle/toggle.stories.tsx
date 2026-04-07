import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Toggle } from "./toggle-root";

const meta = {
  title: "Controls/Toggle",
  component: Toggle,
  args: {
    defaultPressed: true,
    children: "Compact mode",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Pressed states should remain quiet</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Toggle defaultPressed>Compact mode</Toggle>
        <Toggle>Editorial spacing</Toggle>
        <Toggle size="lg">Accent hints</Toggle>
      </CardContent>
    </Card>
  ),
};
