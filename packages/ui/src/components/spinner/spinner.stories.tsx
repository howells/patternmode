import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Spinner } from "./spinner-root";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>Loading indicators should stay understated</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Spinner className="text-accent" />
        <p className="text-body text-muted-foreground">
          Regenerating the Storybook review surface.
        </p>
      </CardContent>
    </Card>
  ),
};
