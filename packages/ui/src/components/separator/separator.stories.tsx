import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Separator } from "./separator-root";

const meta = {
  title: "Primitives/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <Card className="w-[28rem]">
      <CardHeader>
        <CardTitle>Section divider</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-body text-muted-foreground">
          Shared surfaces need understated hierarchy, not heavy chrome.
        </p>
        <Separator />
        <p className="text-body text-muted-foreground">
          Separator lines should quietly support density.
        </p>
      </CardContent>
    </Card>
  ),
};
