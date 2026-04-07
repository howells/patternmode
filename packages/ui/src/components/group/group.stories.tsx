import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";
import { Button } from "../button";
import { Group } from "./group-root";

const meta = {
  title: "Layout/Group",
  component: Group,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Group>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Group gap="sm" wrap>
      <Badge variant="neutral">Review</Badge>
      <Badge variant="accent">Shared</Badge>
      <Button size="sm" variant="secondary">
        Open
      </Button>
      <Button size="sm">Ship</Button>
    </Group>
  ),
};
