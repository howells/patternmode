import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";
import { Flex } from "./flex-root";

const meta = {
  title: "Layout/Flex",
  component: Flex,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap">
      <Badge>Foundation</Badge>
      <Badge variant="accent">Layout</Badge>
      <Badge variant="outline">Shared</Badge>
    </Flex>
  ),
};
