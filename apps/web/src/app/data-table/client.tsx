"use client";

import { DataTable, DataTableFacetedFilter } from "@patternmode/data-table";
import { Separator } from "@patternmode/separator";
import { Stack } from "@patternmode/stack";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";

type Person = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Pending" | "Disabled";
  createdAt: string;
};

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => (
      <span className="font-medium">{String(info.getValue())}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => (
      <span className="text-zinc-600 dark:text-zinc-400">
        {String(info.getValue())}
      </span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    filterFn: (row, columnId, filterValue: unknown) => {
      const selected = Array.isArray(filterValue)
        ? (filterValue as string[])
        : [];
      if (selected.length === 0) return true;
      const val = String(row.getValue(columnId));
      return selected.includes(val);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: (row, columnId, filterValue: unknown) => {
      const selected = Array.isArray(filterValue)
        ? (filterValue as string[])
        : [];
      if (selected.length === 0) return true;
      const val = String(row.getValue(columnId));
      return selected.includes(val);
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: (info) => new Date(String(info.getValue())).toLocaleDateString(),
  },
];

export default function DataTableClient({ data }: { data: Person[] }) {
  const tableRef = React.useRef<any | null>(null);

  const roleOptions = React.useMemo(
    () =>
      [
        { id: "r1", label: "Admin", value: "Admin" },
        { id: "r2", label: "Editor", value: "Editor" },
        { id: "r3", label: "Viewer", value: "Viewer" },
      ] as const,
    []
  );
  const statusOptions = React.useMemo(
    () =>
      [
        { id: "s1", label: "Active", value: "Active" },
        { id: "s2", label: "Pending", value: "Pending" },
        { id: "s3", label: "Disabled", value: "Disabled" },
      ] as const,
    []
  );

  return (
    <Stack gap={2}>
      <Stack align="center" direction="horizontal" gap={2}>
        <DataTableFacetedFilter table={tableRef.current} columnId="role" options={roleOptions} placeholder="Role" />
        <DataTableFacetedFilter table={tableRef.current} columnId="status" options={statusOptions} placeholder="Status" />
      </Stack>
      <Separator />
      <DataTable<Person>
        columns={columns}
        data={data}
        enableRowSelection
        initialPageSize={10}
        onTableReady={(t) => {
          tableRef.current = t;
        }}
        pageSizes={[10, 20, 50, 100]}
      />
    </Stack>
  );
}
