import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { InputGroupAddon } from "./input-group-addon";
import { InputGroupButton } from "./input-group-button";
import { InputGroupInput } from "./input-group-input";
import { InputGroup } from "./input-group-root";
import { InputGroupTextarea } from "./input-group-textarea";

const meta = {
  title: "Forms/Input Group",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="w-[30rem]">
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput defaultValue="patternmode.design" />
        <InputGroupButton>Open</InputGroupButton>
      </InputGroup>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle>Composed inputs should keep one outer shell</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <InputGroup>
          <InputGroupAddon>Theme</InputGroupAddon>
          <InputGroupInput defaultValue="Patternmode Default" />
          <InputGroupButton>Save</InputGroupButton>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>Notes</InputGroupAddon>
          <InputGroupTextarea defaultValue="Keep shared controls neutral, typed, and broad enough for downstream reuse." />
        </InputGroup>
      </CardContent>
    </Card>
  ),
};
