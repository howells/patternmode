import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table-root";

const meta = {
  title: "Data Display/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => (
    <Card className="w-[44rem]">
      <CardHeader>
        <CardTitle>Upstream review queue</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Primitive</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Combobox</TableCell>
              <TableCell>
                <Badge variant="accent">Reviewing</Badge>
              </TableCell>
              <TableCell>Added</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Table</TableCell>
              <TableCell>
                <Badge variant="success">Stable</Badge>
              </TableCell>
              <TableCell>Visual only</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Empty state</TableCell>
              <TableCell>
                <Badge variant="neutral">Ready</Badge>
              </TableCell>
              <TableCell>Storybook</TableCell>
            </TableRow>
          </TableBody>
          <TableCaption>
            Shared status surfaces should not require downstream tables and tags
            on day one.
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  ),
};
