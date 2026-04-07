import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { CheckboxField } from "./checkbox-field-root";

const meta = {
  title: "Forms/Checkbox Field",
  component: CheckboxField,
  args: {
    defaultChecked: true,
    description:
      "Enable package-owned story coverage for each upstream primitive.",
    label: "Track component stories",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>
          Checkbox fields should preserve readable hierarchy
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CheckboxField
          defaultChecked
          description="Required for review confidence and regression visibility."
          label="Package-owned Storybook stories"
        />
        <CheckboxField
          description="Use app-local wrappers only when the API boundary is genuinely product-specific."
          label="Keep workflow wrappers downstream"
        />
      </CardContent>
    </Card>
  ),
};
