import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { RadioGroup, RadioGroupItem } from "./radio-group-root";

const meta = {
  title: "Forms/Radio Group",
  component: RadioGroup,
  args: {
    defaultValue: "upstream",
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem value="upstream">Shared upstream</RadioGroupItem>
      <RadioGroupItem value="local">App-local composition</RadioGroupItem>
      <RadioGroupItem value="review">Needs review</RadioGroupItem>
    </RadioGroup>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[32rem]">
      <CardHeader>
        <CardTitle>Ownership should be explicit</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="upstream">
          <RadioGroupItem
            description="Stable controls, tokens, and overlays belong in the library."
            value="upstream"
          >
            Promote upstream
          </RadioGroupItem>
          <RadioGroupItem
            description="Keep domain-heavy workflows close to the product."
            value="local"
          >
            Keep app-local
          </RadioGroupItem>
          <RadioGroupItem
            description="Not enough signal yet. Review again after use in a real screen."
            value="review"
          >
            Hold for review
          </RadioGroupItem>
        </RadioGroup>
      </CardContent>
    </Card>
  ),
};
