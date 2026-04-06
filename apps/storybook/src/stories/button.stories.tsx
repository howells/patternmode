import { Button } from "@patternmode/ui/components/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: {
    children: "Launch from the house style",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <div className="grid w-[42rem] gap-4 rounded-[var(--radius-xl)] border border-border bg-panel/92 p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-label text-muted-foreground uppercase">
          Patternmode actions
        </p>
        <h3 className="font-display text-title-sm">
          One system, several tones
        </h3>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button>Primary action</Button>
        <Button variant="secondary">Secondary action</Button>
        <Button variant="accent">Accent action</Button>
        <Button variant="ghost">Quiet action</Button>
      </div>
    </div>
  ),
};
