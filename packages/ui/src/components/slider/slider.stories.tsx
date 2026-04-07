import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Slider } from "./slider-root";

const meta = {
  title: "Forms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    const [value, setValue] = useState([64]);

    return (
      <Card className="w-[28rem]">
        <CardHeader>
          <CardTitle>Density control</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Slider max={100} min={0} onValueChange={setValue} value={value} />
          <p className="text-body text-muted-foreground">
            Current value: {value[0]}%
          </p>
        </CardContent>
      </Card>
    );
  },
};
