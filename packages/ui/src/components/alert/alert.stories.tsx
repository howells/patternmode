import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Alert, AlertDescription, AlertTitle } from "./alert-root";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Alert className="w-[28rem]">
      <AlertTitle>Review checkpoint</AlertTitle>
      <AlertDescription>
        This component is ready to move upstream when its API is stable across
        at least two real screens.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <Card className="w-[30rem]">
      <CardHeader>
        <CardTitle>Alerts should stay composable</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Alert variant="accent">
          <AlertTitle>Accent notice</AlertTitle>
          <AlertDescription>
            Use for gentle nudges and library guidance.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Destructive state</AlertTitle>
          <AlertDescription>
            Reserve this tone for actual error or risk conditions.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  ),
};
