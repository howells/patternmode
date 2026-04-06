import { Badge } from "@patternmode/ui/components/badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  args: {
    children: "Canonical upstream",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Accent: Story = {
  args: {
    variant: "accent",
  },
};

export const Success: Story = {
  args: {
    children: "Stable primitive",
    variant: "success",
  },
};

export const ReviewSurface: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius-xl)] border border-border bg-panel/92 p-6 shadow-sm">
      <Badge>Canonical upstream</Badge>
      <Badge variant="accent">House style</Badge>
      <Badge variant="success">Ready for reuse</Badge>
      <Badge variant="outline">Local wrappers allowed</Badge>
    </div>
  ),
};
