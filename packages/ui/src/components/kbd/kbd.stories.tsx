import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../text";
import { Kbd } from "./kbd-root";

const meta = {
  title: "Foundations/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Text>Open the command palette with</Text>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </div>
  ),
};
