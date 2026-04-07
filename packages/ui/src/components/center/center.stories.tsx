import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "../card";
import { Center } from "./center-root";

const meta = {
  title: "Layout/Center",
  component: Center,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Center>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Center className="h-56 w-80 rounded-[var(--radius-xl)] border border-border-strong/70 border-dashed bg-panel-muted/80">
      <Card className="w-56 p-6 text-center">Centered review surface</Card>
    </Center>
  ),
};
