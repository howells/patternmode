import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import { Switch } from "./switch-root";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  args: {
    defaultChecked: true,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>State toggles should feel calm</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between gap-4 rounded-[calc(var(--radius-lg)-4px)] bg-secondary/70 px-4 py-3">
          <div className="space-y-1">
            <Label className="text-foreground" htmlFor="switch-story">
              Use accent treatment
            </Label>
            <p className="text-body text-muted-foreground">
              Keep the same component markup across projects.
            </p>
          </div>
          <Switch defaultChecked id="switch-story" />
        </div>
      </CardContent>
    </Card>
  ),
};
