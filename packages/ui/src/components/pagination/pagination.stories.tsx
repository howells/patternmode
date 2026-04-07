import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Pagination } from "./pagination-root";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onPageChange: () => undefined,
    page: 2,
    totalPages: 13,
  },
  render: () => {
    const [page, setPage] = useState(2);

    return (
      <div className="w-[40rem]">
        <Pagination onPageChange={setPage} page={page} totalPages={13} />
      </div>
    );
  },
};

export const ReviewSurface: Story = {
  args: {
    onPageChange: () => undefined,
    page: 7,
    totalPages: 24,
  },
  render: () => {
    const [page, setPage] = useState(7);

    return (
      <Card className="w-[40rem]">
        <CardHeader>
          <CardTitle>Lists need a shared navigation baseline</CardTitle>
        </CardHeader>
        <CardContent>
          <Pagination onPageChange={setPage} page={page} totalPages={24} />
        </CardContent>
      </Card>
    );
  },
};
