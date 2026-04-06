import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Label } from "./label-root";

const meta = {
  title: "Forms/Label",
  component: Label,
  args: {
    children: "Project label",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>Labels stay quiet but deliberate</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="label-story">Theme preset name</Label>
        <Input id="label-story" placeholder="Patternmode Default" />
      </CardContent>
    </Card>
  ),
};
