import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import { Checkbox } from "./checkbox-root";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  args: {
    defaultChecked: true,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Selection should stay readable at a glance</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <label className="flex items-start gap-3" htmlFor="checkbox-story-a">
          <Checkbox defaultChecked id="checkbox-story-a" />
          <div className="grid gap-1">
            <Label className="text-foreground" htmlFor="checkbox-story-a">
              Promote to the upstream library
            </Label>
            <p className="text-body text-muted-foreground">
              Shared behavior belongs here once the API is stable.
            </p>
          </div>
        </label>
        <label className="flex items-start gap-3" htmlFor="checkbox-story-b">
          <Checkbox id="checkbox-story-b" />
          <div className="grid gap-1">
            <Label className="text-foreground" htmlFor="checkbox-story-b">
              Keep as app-local composition
            </Label>
            <p className="text-body text-muted-foreground">
              Workflow-specific wrappers should stay outside the primitive
              layer.
            </p>
          </div>
        </label>
      </CardContent>
    </Card>
  ),
};
