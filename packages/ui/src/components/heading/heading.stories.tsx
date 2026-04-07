import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "./heading-root";

const meta = {
  title: "Foundations/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <div className="grid w-[42rem] gap-4">
      <Heading level={1} size="lg">
        Canonical library surfaces need a typographic hierarchy
      </Heading>
      <Heading level={2} size="base">
        Product shells should not reinvent heading rhythm
      </Heading>
      <Heading level={3} size="sm">
        Package-owned stories are part of the visual contract
      </Heading>
    </div>
  ),
};
