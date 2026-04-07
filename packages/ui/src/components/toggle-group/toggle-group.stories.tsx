import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group-root";

const meta = {
  title: "Controls/Toggle Group",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <ToggleGroup defaultValue="shared" type="single">
      <ToggleGroupItem value="shared">Shared</ToggleGroupItem>
      <ToggleGroupItem value="local">Local</ToggleGroupItem>
      <ToggleGroupItem value="review">Review</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const ReviewSurface: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Grouped state should read immediately</CardTitle>
      </CardHeader>
      <CardContent>
        <ToggleGroup defaultValue="shared" type="single">
          <ToggleGroupItem value="shared">Shared upstream</ToggleGroupItem>
          <ToggleGroupItem value="local">App-local</ToggleGroupItem>
          <ToggleGroupItem value="review">Needs review</ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  ),
};
