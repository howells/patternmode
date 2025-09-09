// Server component with metadata; client logic lives in ./client
import { Heading } from "@patternmode/heading";
import { Stack } from "@patternmode/stack";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import DataTableClient from "./client";

export const metadata = { title: "Data Table" };

type Person = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Pending" | "Disabled";
  createdAt: string;
};

function makePeople(count: number): Person[] {
  const roles: Person["role"][] = ["Admin", "Editor", "Viewer"];
  const statuses: Person["status"][] = ["Active", "Pending", "Disabled"];
  const people: Person[] = [];
  for (let i = 1; i <= count; i++) {
    const id = String(i);
    people.push({
      id,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      createdAt: new Date(Date.now() - i * 86_400_000).toISOString(),
    });
  }
  return people;
}

export default function DataTablePage() {
  const data = React.useMemo(() => makePeople(250), []);

  return (
    <Stack
      className={cx("mx-auto w-full max-w-6xl bg-white p-6 dark:bg-zinc-950")}
      direction="vertical"
    >
      <Stack gap={2}>
        <Heading level={1}>Data Table</Heading>
        <Text className="text-zinc-600 dark:text-zinc-400" size="sm">
          TanStack-powered data table with search, filters, column visibility,
          selection, and pagination.
        </Text>
      </Stack>

      <DataTableClient data={data} />
    </Stack>
  );
}
