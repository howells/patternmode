import type { Meta, StoryObj } from "@storybook/react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Text } from "./text-root";

const meta = {
  title: "Foundations/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="grid w-[34rem] gap-3">
      <Text size="lg" weight="medium">
        Shared narrative text should still carry the library’s tone.
      </Text>
      <Text>
        Body copy needs a predictable rhythm across Storybook, docs, and product
        shells.
      </Text>
      <Text variant="muted">
        Muted text should stay legible without competing with headings and
        actions.
      </Text>
    </div>
  ),
};

export const ReviewSurface: Story = {
  render: () => (
    <Card className="w-[34rem]">
      <CardHeader>
        <CardTitle>Typography belongs in the package surface too</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Text>
          Downstream apps should inherit text rhythm and tonal contrast instead
          of redefining paragraph behavior repeatedly.
        </Text>
        <Text variant="muted">
          This is the kind of small, foundational consistency that determines
          whether a shared library actually feels canonical.
        </Text>
      </CardContent>
    </Card>
  ),
};
