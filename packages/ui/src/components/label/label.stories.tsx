import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import type React from "react";
import { Checkbox } from "../checkbox";
import { Input } from "../input";
import { Radio } from "../radio";
import { RadioGroup } from "../radio-group";
import { Stack } from "../stack";
import { Switch } from "../switch";
import { Label } from "./label-root";

type LabelStoryArgs = React.ComponentProps<typeof Label> & {
  labelText?: string;
};

const meta: Meta<LabelStoryArgs> = {
  title: "Label",
  component: Label,
  argTypes: {
    // Content
    children: {
      control: "text",
      description: "Label text content",
    },

    // Advanced (hidden)
    htmlFor: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    children: "Label",
  },
  parameters: {
    builder: {
      category: "form",
      icon: "tag",
    },
    docs: {
      description: {
        component:
          "Label provides an accessible label for form controls. Associates with form elements via the htmlFor prop.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {};

/**
 * Labels paired with various form controls.
 */
export const WithFormControls: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Label can be paired with any form control using the htmlFor prop for accessibility.",
      },
    },
  },
  render: () => (
    <Stack gap="lg">
      <Stack gap="xs">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="you@example.com" />
      </Stack>

      <Stack direction="row" gap="sm">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </Stack>

      <Stack direction="row" gap="sm">
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </Stack>

      <RadioGroup defaultValue="a">
        <Stack direction="row" gap="sm">
          <Radio id="option-a" value="a" />
          <Label htmlFor="option-a">Option A</Label>
        </Stack>
      </RadioGroup>
    </Stack>
  ),
};
