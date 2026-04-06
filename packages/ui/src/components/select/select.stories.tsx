import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select-root";

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-72">
      <Select defaultValue="default">
        <SelectTrigger>
          <SelectValue placeholder="Choose a preset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Patternmode Default</SelectItem>
          <SelectItem value="quiet">Quiet Editorial</SelectItem>
          <SelectItem value="bright">Brighter Accent</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Variant choice should stay understated</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Select defaultValue="default">
          <SelectTrigger>
            <SelectValue placeholder="Choose an upstream preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectLabel>House presets</SelectLabel>
            <SelectItem value="default">Patternmode Default</SelectItem>
            <SelectItem value="client">Client Accent Lift</SelectItem>
            <SelectItem value="dark">High Contrast Review</SelectItem>
            <SelectSeparator />
            <SelectLabel>Ownership</SelectLabel>
            <SelectItem value="local">App-local wrapper</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  ),
};
