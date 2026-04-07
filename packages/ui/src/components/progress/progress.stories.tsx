import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Progress, ProgressCircle } from "./progress-root";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  args: {
    value: 64,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <Badge variant="accent">Feedback</Badge>
        <CardTitle>Progress should feel calm, not loud</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-body text-muted-foreground">
            <span>Primitive coverage</span>
            <span>78%</span>
          </div>
          <Progress value={78} />
        </div>
        <div className="flex justify-center">
          <ProgressCircle label="Library completion" value={78}>
            <span className="font-medium text-[0.82rem] text-foreground">
              78%
            </span>
          </ProgressCircle>
        </div>
      </CardContent>
    </Card>
  ),
};
