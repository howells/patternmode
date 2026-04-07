import type { Meta, StoryObj } from "@storybook/react";
import {
  type ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type React from "react";
import { useState } from "react";
import { Badge } from "../../components/badge";
import { Button } from "../../components/button";
import { Flex } from "../../components/flex";
import { Heading } from "../../components/heading";
import { Stack } from "../../components/stack";
import { Text } from "../../components/text";
import {
  createExpanderColumn,
  createSelectionColumn,
  DataGrid,
  DataGridContainer,
} from "../data-grid";
import { DataGridTable } from "../data-grid-table";

type DataGridStoryArgs = React.ComponentProps<typeof DataGrid> & {
  emptyMessage?: string;
  clickMessage?: string;
};

const meta: Meta<DataGridStoryArgs> = {
  title: "DataGridRoot",
  component: DataGrid,
  argTypes: {
    // Content
    emptyMessage: {
      control: "text",
      description: "Message shown when no data is available",
    },

    // States
    isLoading: {
      control: "boolean",
      description: "Show loading state",
    },
    loadingMode: {
      control: "select",
      options: ["skeleton", "spinner"],
      description: "Loading indicator style",
    },

    // Hidden (complex props)
    table: { table: { disable: true } },
    recordCount: { table: { disable: true } },
    children: { table: { disable: true } },
    onRowClick: { table: { disable: true } },
    tableLayout: { table: { disable: true } },
  },
  args: {
    emptyMessage: "No data available",
    isLoading: false,
    loadingMode: "skeleton",
  },
  parameters: {
    builder: {
      category: "container",
      icon: "puzzle",
    },
    layout: "padded",
    docs: {
      description: {
        component:
          "Data grid component built on TanStack Table. Supports sorting, filtering, selection, and expandable rows.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* --------------------------------- Sample Data --------------------------------- */

interface User {
  email: string;
  id: number;
  name: string;
  role: "admin" | "user" | "guest";
  status: "active" | "inactive";
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Cody Fisher",
    email: "cody@example.com",
    role: "user",
    status: "active",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther@example.com",
    role: "user",
    status: "inactive",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    email: "jenny@example.com",
    role: "guest",
    status: "active",
  },
  {
    id: 5,
    name: "Kristin Watson",
    email: "kristin@example.com",
    role: "user",
    status: "active",
  },
];

const columnHelper = createColumnHelper<User>();

const basicColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => <Text variant="muted">{info.getValue()}</Text>,
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: (info) => {
      const role = info.getValue();
      let variant: "default" | "secondary" | "outline" = "outline";
      if (role === "admin") {
        variant = "default";
      } else if (role === "user") {
        variant = "secondary";
      }
      return (
        <Badge className="capitalize" variant={variant}>
          {role}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <Badge
          className="capitalize"
          variant={status === "active" ? "default" : "secondary"}
        >
          {status}
        </Badge>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => (
      <Flex gap="sm">
        <Button appearance="ghost" size="xs">
          Edit
        </Button>
        <Button appearance="ghost" size="xs">
          Delete
        </Button>
      </Flex>
    ),
  }),
];

/* --------------------------------- Stories --------------------------------- */

/**
 * Base interactive story showing minimal DataGrid setup.
 */
export const Base: Story = {
  render: () => {
    const table = useReactTable({
      data: sampleUsers,
      columns: basicColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <DataGrid recordCount={sampleUsers.length} table={table}>
        <DataGridContainer>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="border-border border-b" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-4 py-3 text-left font-medium text-sm"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    className="border-border border-b last:border-b-0 hover:bg-muted/50"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="px-4 py-3" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataGridContainer>
      </DataGrid>
    );
  },
};

/**
 * DataGrid without borders for a cleaner look.
 */
export const NoBorder: Story = {
  render: () => {
    const table = useReactTable({
      data: sampleUsers,
      columns: basicColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <DataGrid recordCount={sampleUsers.length} table={table}>
        <DataGridContainer border="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="border-border border-b" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-4 py-3 text-left font-medium text-sm"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    className="border-border border-b last:border-b-0 hover:bg-muted/50"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="px-4 py-3" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataGridContainer>
      </DataGrid>
    );
  },
};

/**
 * Compact table with dense spacing.
 */
export const Compact: Story = {
  render: () => {
    const table = useReactTable({
      data: sampleUsers,
      columns: basicColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <DataGrid
        recordCount={sampleUsers.length}
        table={table}
        tableLayout={{ dense: true }}
      >
        <DataGridContainer>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="border-border border-b" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-3 py-2 text-left font-medium text-xs"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    className="border-border border-b last:border-b-0 hover:bg-muted/50"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="px-3 py-2 text-sm" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataGridContainer>
      </DataGrid>
    );
  },
};

/**
 * Empty state when no data is available.
 */
export const EmptyState: Story = {
  args: {
    emptyMessage: "No users found",
  },
  argTypes: {
    emptyMessage: { control: "text" },
  },
  render: (args) => {
    const table = useReactTable({
      data: [],
      columns: basicColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <DataGrid emptyMessage={args.emptyMessage} recordCount={0} table={table}>
        <DataGridContainer>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="border-border border-b" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-4 py-3 text-left font-medium text-sm"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 py-12 text-center text-muted-foreground"
                      colSpan={basicColumns.length}
                    >
                      {args.emptyMessage}
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      className="border-border border-b last:border-b-0 hover:bg-muted/50"
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td className="px-4 py-3" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </DataGridContainer>
      </DataGrid>
    );
  },
};

/**
 * Loading state with skeleton placeholders.
 */
export const Loading: Story = {
  render: () => {
    const table = useReactTable({
      data: sampleUsers,
      columns: basicColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
      <DataGrid
        isLoading={true}
        loadingMode="skeleton"
        recordCount={sampleUsers.length}
        table={table}
      >
        <DataGridContainer>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="border-border border-b" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="px-4 py-3 text-left font-medium text-sm"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {[1, 2, 3].map((rowNumber) => (
                  <tr className="border-border border-b" key={rowNumber}>
                    {basicColumns.map((column) => (
                      <td className="px-4 py-3" key={column.id}>
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DataGridContainer>
      </DataGrid>
    );
  },
};

/**
 * Clickable rows that respond to user interaction.
 */
export const ClickableRows: Story = {
  args: {
    clickMessage: "Clicked on",
  },
  argTypes: {
    clickMessage: { control: "text" },
  },
  render: (args) => {
    const [clickedUserName, setClickedUserName] = useState<string | null>(null);
    const table = useReactTable({
      data: sampleUsers,
      columns: basicColumns,
      getCoreRowModel: getCoreRowModel(),
    });

    const handleRowClick = (user: User) => {
      setClickedUserName(user.name);
    };

    return (
      <div className="space-y-4">
        <DataGrid
          onRowClick={handleRowClick}
          recordCount={sampleUsers.length}
          table={table}
        >
          <DataGridContainer>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr className="border-border border-b" key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          className="px-4 py-3 text-left font-medium text-sm"
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      className="cursor-pointer border-border border-b last:border-b-0 hover:bg-muted/50"
                      key={row.id}
                      onClick={() => handleRowClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td className="px-4 py-3" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DataGridContainer>
        </DataGrid>
        <div className="text-muted-foreground text-sm">
          {clickedUserName
            ? `${args.clickMessage} ${clickedUserName}`
            : "Click a row to preview the interaction output."}
        </div>
      </div>
    );
  },
};

/* --------------------------------- Expandable Rows --------------------------------- */

interface Order {
  customer: string;
  date: string;
  id: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  orderNumber: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  total: number;
}

const sampleOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: "Alice Johnson",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: [
      { name: "Wireless Mouse", quantity: 2, price: 49.99 },
      { name: "USB-C Cable", quantity: 3, price: 15.99 },
      { name: "Laptop Stand", quantity: 1, price: 89.99 },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: "Bob Smith",
    date: "2024-01-16",
    status: "shipped",
    total: 149.99,
    items: [
      { name: "Mechanical Keyboard", quantity: 1, price: 129.99 },
      { name: "Keycap Set", quantity: 1, price: 20.0 },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: "Carol Davis",
    date: "2024-01-17",
    status: "processing",
    total: 499.99,
    items: [
      { name: '27" Monitor', quantity: 1, price: 349.99 },
      { name: "Monitor Arm", quantity: 1, price: 89.99 },
      { name: "HDMI Cable", quantity: 2, price: 12.99 },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: "David Wilson",
    date: "2024-01-18",
    status: "pending",
    total: 79.99,
    items: [{ name: "Webcam", quantity: 1, price: 79.99 }],
  },
];

/* --------------------------------- Nested Order Items Grid --------------------------------- */

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

function OrderItemsGrid({ items }: { items: OrderItem[] }) {
  const itemColumns: ColumnDef<OrderItem>[] = [
    {
      accessorKey: "name",
      header: "Item",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "quantity",
      header: "Qty",
      cell: ({ row }) => row.original.quantity,
      meta: {
        headerClassName: "text-right w-20",
        cellClassName: "text-right",
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      meta: {
        headerClassName: "text-right w-24",
        cellClassName: "text-right",
      },
    },
    {
      id: "total",
      header: "Total",
      cell: ({ row }) =>
        `$${(row.original.quantity * row.original.price).toFixed(2)}`,
      meta: {
        headerClassName: "text-right w-24",
        cellClassName: "text-right font-medium",
      },
    },
  ];

  const itemsTable = useReactTable({
    data: items,
    columns: itemColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataGrid
      recordCount={items.length}
      table={itemsTable}
      tableLayout={{ dense: true, rowHeight: 48 }}
    >
      <DataGridContainer border="none">
        <DataGridTable />
      </DataGridContainer>
    </DataGrid>
  );
}

/**
 * Expandable rows with nested content.
 * Click the chevron to reveal detailed order information.
 */
export const ExpandableRows: Story = {
  render: () => {
    const [data] = useState<Order[]>(sampleOrders);

    const columns: ColumnDef<Order>[] = [
      createExpanderColumn<Order>(),
      {
        accessorKey: "orderNumber",
        header: "Order #",
        cell: ({ row }) => (
          <span className="font-mono text-xs">{row.original.orderNumber}</span>
        ),
      },
      {
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => (
          <span className="font-medium">{row.original.customer}</span>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const statusColors = {
            pending: "secondary",
            processing: "default",
            shipped: "default",
            delivered: "default",
          } as const;

          return (
            <Badge variant={statusColors[row.original.status]}>
              {row.original.status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => (
          <span className="font-medium">${row.original.total.toFixed(2)}</span>
        ),
        meta: {
          headerClassName: "text-right",
          cellClassName: "text-right",
          expandedContent: (row) => (
            <Stack gap="base">
              <div>
                <Heading className="mb-3" level="4" size="sm">
                  Order Items
                </Heading>
                <div className="overflow-hidden rounded-xl border">
                  <OrderItemsGrid items={row.items} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Text>
                  <span className="font-medium text-muted-foreground">
                    Customer:
                  </span>{" "}
                  {row.customer}
                </Text>
                <Text>
                  <span className="font-medium text-muted-foreground">
                    Order Date:
                  </span>{" "}
                  {new Date(row.date).toLocaleDateString()}
                </Text>
              </div>
            </Stack>
          ),
        },
      },
    ];

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getRowCanExpand: () => true,
    });

    return (
      <DataGrid recordCount={data.length} table={table}>
        <DataGridContainer>
          <DataGridTable />
        </DataGridContainer>
      </DataGrid>
    );
  },
};

/* --------------------------------- Checkbox Selection --------------------------------- */

/**
 * Row selection with checkboxes.
 * Includes a "select all" checkbox in the header.
 */
export const WithCheckboxSelection: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState({});

    const columns: ColumnDef<User>[] = [
      createSelectionColumn<User>(),
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <span className="font-medium">{row.original.name}</span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <Text variant="muted">{row.original.email}</Text>,
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.role;
          let variant: "default" | "secondary" | "outline" = "outline";
          if (role === "admin") {
            variant = "default";
          } else if (role === "user") {
            variant = "secondary";
          }
          return (
            <Badge className="capitalize" variant={variant}>
              {role}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              className="capitalize"
              variant={status === "active" ? "default" : "secondary"}
            >
              {status}
            </Badge>
          );
        },
      },
    ];

    const table = useReactTable({
      data: sampleUsers,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      state: {
        rowSelection,
      },
    });

    const selectedCount = Object.keys(rowSelection).length;

    return (
      <Stack gap="base">
        {selectedCount > 0 && (
          <Flex className="items-center justify-between rounded-lg border bg-muted/50 px-4 py-2">
            <Text size="sm">
              {selectedCount} of {sampleUsers.length} row(s) selected
            </Text>
            <Button
              appearance="ghost"
              onClick={() => setRowSelection({})}
              size="sm"
            >
              Clear selection
            </Button>
          </Flex>
        )}
        <DataGrid recordCount={sampleUsers.length} table={table}>
          <DataGridContainer>
            <DataGridTable />
          </DataGridContainer>
        </DataGrid>
      </Stack>
    );
  },
};
