import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty-root";

const meta = {
  title: "Data Display/Empty",
  component: Empty,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

function EmptyGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 4.5h7v7h-7z"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M6 7.75h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export const Base: Story = {
  render: () => (
    <Empty className="w-[42rem]" layout="card">
      <EmptyHeader>
        <EmptyMedia>
          <EmptyGlyph />
        </EmptyMedia>
        <EmptyTitle>No downstream overrides left</EmptyTitle>
        <EmptyDescription>
          This surface has fully converged on the upstream library. Add a local
          wrapper only if the product boundary is genuinely domain-owned.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyActions>
        <Button>Open components</Button>
        <Button variant="secondary">Read guidelines</Button>
      </EmptyActions>
    </Empty>
  ),
};
