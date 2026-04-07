import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Combobox } from "./combobox-root";

const items = [
  { label: "Patternmode Default", value: "default" },
  { label: "Quiet Editorial", value: "quiet" },
  { label: "Accent Lift", value: "accent" },
  { label: "Downstream Wrapper", value: "wrapper" },
];

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
  args: {
    items,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => {
    const [value, setValue] = useState("default");

    return (
      <Card className="w-[28rem]">
        <CardHeader>
          <CardTitle>Preset chooser</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Combobox {...args} onValueChange={setValue} value={value} />
          <p className="text-body text-muted-foreground">
            Current value: {value || "None"}
          </p>
        </CardContent>
      </Card>
    );
  },
};
