import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "./button-group-root";

const meta = {
  title: "Foundations/Button Group",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Back</Button>
      <Button>Save</Button>
      <Button variant="accent">Publish</Button>
    </ButtonGroup>
  ),
};

export const Segmented: Story = {
  render: () => (
    <ButtonGroup variant="segmented">
      <Button variant="ghost">Preview</Button>
      <ButtonGroupSeparator />
      <Button variant="ghost">Review</Button>
      <ButtonGroupSeparator />
      <ButtonGroupText>Status: Ready</ButtonGroupText>
    </ButtonGroup>
  ),
};
