"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { MenuItem } from "@patternmode/ui/components/menu-item";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Tabs, TabsList, TabsTrigger } from "@patternmode/ui/components/tabs";
import { Text } from "@patternmode/ui/components/text";
import {
  AppShell,
  AppShellContent,
  AppShellSidebar,
} from "@patternmode/ui/compositions/app-shell";
import {
  DataGrid,
  DataGridContainer,
  DataGridFilterableHeader,
  type FilterOption,
} from "@patternmode/ui/compositions/data-grid";
import { DataGridTable } from "@patternmode/ui/compositions/data-grid-table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  Hash,
  Inbox,
  Layers,
  LayoutGrid,
  ListFilter,
  Plus,
  Search,
  Settings,
  Timer,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

/* -- Data --------------------------------------------------------- */

const TEAMS = [
  { name: "Engineering", color: "#3b82f6" },
  { name: "Design", color: "#ec4899" },
  { name: "Product", color: "#22c55e" },
  { name: "Infrastructure", color: "#f59e0b" },
];

type Status = "backlog" | "todo" | "in-progress" | "done" | "cancelled";

interface Issue {
  id: string;
  title: string;
  status: Status;
  priority: "urgent" | "high" | "medium" | "low" | "none";
  assignee: string;
  date: string;
  label?: string;
}

const STATUS_ICON: Record<Status, typeof Circle> = {
  backlog: Circle,
  todo: Circle,
  "in-progress": ArrowUpCircle,
  done: CheckCircle2,
  cancelled: XCircle,
};

const STATUS_COLOR: Record<Status, string> = {
  backlog: "text-muted-foreground",
  todo: "text-muted-foreground",
  "in-progress": "text-amber-500",
  done: "text-emerald-500",
  cancelled: "text-destructive",
};

const ISSUES: Issue[] = [
  {
    id: "ENG-481",
    title: "Fix memory leak in WebSocket connection handler",
    status: "in-progress",
    priority: "urgent",
    assignee: "SC",
    date: "Apr 4",
    label: "Bug",
  },
  {
    id: "ENG-480",
    title: "Implement rate limiting for public API endpoints",
    status: "in-progress",
    priority: "high",
    assignee: "MJ",
    date: "Apr 3",
    label: "Security",
  },
  {
    id: "ENG-479",
    title: "Add dark mode support to dashboard components",
    status: "todo",
    priority: "medium",
    assignee: "ER",
    date: "Apr 3",
    label: "Feature",
  },
  {
    id: "ENG-478",
    title: "Optimize database queries for user search",
    status: "todo",
    priority: "high",
    assignee: "JW",
    date: "Apr 2",
  },
  {
    id: "ENG-477",
    title: "Migrate authentication flow to OAuth 2.1",
    status: "in-progress",
    priority: "high",
    assignee: "SC",
    date: "Apr 2",
    label: "Security",
  },
  {
    id: "ENG-476",
    title: "Add E2E tests for checkout flow",
    status: "backlog",
    priority: "medium",
    assignee: "PP",
    date: "Apr 1",
    label: "Testing",
  },
  {
    id: "ENG-475",
    title: "Refactor notification service to use event bus",
    status: "backlog",
    priority: "low",
    assignee: "MJ",
    date: "Apr 1",
  },
  {
    id: "ENG-474",
    title: "Set up monitoring alerts for payment failures",
    status: "done",
    priority: "urgent",
    assignee: "JW",
    date: "Mar 31",
    label: "Infra",
  },
  {
    id: "ENG-473",
    title: "Update TypeScript to v5.8 across all packages",
    status: "done",
    priority: "low",
    assignee: "ER",
    date: "Mar 30",
  },
  {
    id: "ENG-472",
    title: "Implement cursor-based pagination for feed API",
    status: "backlog",
    priority: "medium",
    assignee: "PP",
    date: "Mar 29",
    label: "Feature",
  },
  {
    id: "ENG-471",
    title: "Fix race condition in concurrent file uploads",
    status: "todo",
    priority: "high",
    assignee: "SC",
    date: "Mar 28",
    label: "Bug",
  },
  {
    id: "ENG-470",
    title: "Add support for bulk operations in admin panel",
    status: "backlog",
    priority: "medium",
    assignee: "MJ",
    date: "Mar 27",
    label: "Feature",
  },
  {
    id: "ENG-469",
    title: "Audit and rotate all third-party API keys",
    status: "done",
    priority: "urgent",
    assignee: "JW",
    date: "Mar 26",
    label: "Security",
  },
  {
    id: "ENG-468",
    title: "Create shared component library documentation",
    status: "todo",
    priority: "low",
    assignee: "ER",
    date: "Mar 25",
  },
  {
    id: "ENG-467",
    title: "Implement graceful degradation for offline mode",
    status: "backlog",
    priority: "medium",
    assignee: "PP",
    date: "Mar 24",
    label: "Feature",
  },
  {
    id: "ENG-466",
    title: "Replace polling with SSE for real-time dashboard",
    status: "in-progress",
    priority: "high",
    assignee: "SC",
    date: "Mar 23",
    label: "Feature",
  },
  {
    id: "ENG-465",
    title: "Fix Safari rendering bug in data table headers",
    status: "todo",
    priority: "medium",
    assignee: "ER",
    date: "Mar 22",
    label: "Bug",
  },
  {
    id: "ENG-464",
    title: "Add request tracing with OpenTelemetry spans",
    status: "backlog",
    priority: "medium",
    assignee: "JW",
    date: "Mar 21",
    label: "Infra",
  },
  {
    id: "ENG-463",
    title: "Implement webhook retry logic with exponential backoff",
    status: "in-progress",
    priority: "high",
    assignee: "MJ",
    date: "Mar 20",
  },
  {
    id: "ENG-462",
    title: "Migrate Redis cache layer to cluster mode",
    status: "done",
    priority: "high",
    assignee: "JW",
    date: "Mar 19",
    label: "Infra",
  },
  {
    id: "ENG-461",
    title: "Add input validation for file upload endpoints",
    status: "done",
    priority: "urgent",
    assignee: "SC",
    date: "Mar 18",
    label: "Security",
  },
  {
    id: "ENG-460",
    title: "Create design token export script for Figma sync",
    status: "backlog",
    priority: "low",
    assignee: "ER",
    date: "Mar 17",
  },
  {
    id: "ENG-459",
    title: "Fix timezone handling in scheduled report generation",
    status: "todo",
    priority: "medium",
    assignee: "PP",
    date: "Mar 16",
    label: "Bug",
  },
  {
    id: "ENG-458",
    title: "Implement row-level security for multi-tenant data",
    status: "in-progress",
    priority: "urgent",
    assignee: "JW",
    date: "Mar 15",
    label: "Security",
  },
  {
    id: "ENG-457",
    title: "Add skeleton loading states to all list views",
    status: "done",
    priority: "medium",
    assignee: "ER",
    date: "Mar 14",
    label: "Feature",
  },
  {
    id: "ENG-456",
    title: "Optimize image pipeline with sharp and WebP fallback",
    status: "backlog",
    priority: "low",
    assignee: "MJ",
    date: "Mar 13",
  },
  {
    id: "ENG-455",
    title: "Fix memory pressure in long-running batch jobs",
    status: "todo",
    priority: "high",
    assignee: "SC",
    date: "Mar 12",
    label: "Bug",
  },
  {
    id: "ENG-454",
    title: "Add Stripe webhook signature verification",
    status: "done",
    priority: "urgent",
    assignee: "PP",
    date: "Mar 11",
    label: "Security",
  },
  {
    id: "ENG-453",
    title: "Implement feature flag system with LaunchDarkly",
    status: "backlog",
    priority: "medium",
    assignee: "MJ",
    date: "Mar 10",
    label: "Feature",
  },
  {
    id: "ENG-452",
    title: "Refactor permission checks into middleware layer",
    status: "todo",
    priority: "high",
    assignee: "JW",
    date: "Mar 9",
  },
  {
    id: "ENG-451",
    title: "Fix flaky integration tests in CI pipeline",
    status: "in-progress",
    priority: "medium",
    assignee: "PP",
    date: "Mar 8",
    label: "Testing",
  },
  {
    id: "ENG-450",
    title: "Add CSV export for audit log entries",
    status: "backlog",
    priority: "low",
    assignee: "ER",
    date: "Mar 7",
    label: "Feature",
  },
  {
    id: "ENG-449",
    title: "Implement database connection pooling with PgBouncer",
    status: "done",
    priority: "high",
    assignee: "JW",
    date: "Mar 6",
    label: "Infra",
  },
  {
    id: "ENG-448",
    title: "Fix CORS preflight caching for API gateway",
    status: "done",
    priority: "medium",
    assignee: "SC",
    date: "Mar 5",
    label: "Bug",
  },
];

/* -- Tab filter values -------------------------------------------- */

const TAB_FILTER_MAP: Record<string, Status[] | undefined> = {
  all: undefined,
  active: ["in-progress", "todo"],
  backlog: ["backlog"],
  done: ["done"],
};

/* -- Columns ------------------------------------------------------ */

const columnHelper = createColumnHelper<Issue>();

const labelOptions: FilterOption[] = [
  { label: "Bug", value: "Bug" },
  { label: "Feature", value: "Feature" },
  { label: "Security", value: "Security" },
  { label: "Testing", value: "Testing" },
  { label: "Infra", value: "Infra" },
];

const columns: ColumnDef<Issue, unknown>[] = [
  columnHelper.accessor("status", {
    header: "",
    size: 32,
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.status;
      const StatusIcon = STATUS_ICON[status];
      return (
        <Icon
          icon={StatusIcon}
          size="xs"
          className={`shrink-0 ${STATUS_COLOR[status]}`}
        />
      );
    },
    filterFn: (row, _columnId, filterValue: Status[] | undefined) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.original.status);
    },
    meta: {
      cellClassName: "!px-0 !pl-4 !pr-0",
      headerClassName: "!px-0 !pl-4 !pr-0",
    },
  }) as ColumnDef<Issue, unknown>,
  columnHelper.accessor("id", {
    header: "",
    size: 72,
    enableSorting: false,
    cell: ({ getValue }) => (
      <Text variant="muted" size="2xs" tabularNums>
        {getValue()}
      </Text>
    ),
    meta: {
      cellClassName: "!px-0 !pl-1.5 !pr-0",
      headerClassName: "!px-0 !pl-1.5 !pr-0",
    },
  }) as ColumnDef<Issue, unknown>,
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>Title</DataGridFilterableHeader>
    ),
    enableSorting: true,
    cell: ({ getValue }) => (
      <Text size="sm" truncate>
        {getValue()}
      </Text>
    ),
    meta: {
      cellClassName: "!pl-1.5 truncate",
      headerClassName: "!pl-1.5",
    },
  }) as ColumnDef<Issue, unknown>,
  columnHelper.accessor("label", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column} options={labelOptions}>
        Label
      </DataGridFilterableHeader>
    ),
    size: 72,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue: string[] | undefined) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.original.label ?? "");
    },
    cell: ({ getValue }) => {
      const label = getValue();
      if (!label) return null;
      return (
        <Text variant="muted" size="2xs">
          {label}
        </Text>
      );
    },
    meta: {
      cellClassName: "!px-1.5",
      headerClassName: "!px-1.5",
    },
  }) as ColumnDef<Issue, unknown>,
  columnHelper.accessor("date", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>Date</DataGridFilterableHeader>
    ),
    size: 64,
    enableSorting: true,
    cell: ({ getValue }) => (
      <Text variant="muted" size="2xs" tabularNums>
        {getValue()}
      </Text>
    ),
    meta: {
      cellClassName: "!px-1.5",
      headerClassName: "!px-1.5",
    },
  }) as ColumnDef<Issue, unknown>,
  columnHelper.accessor("assignee", {
    header: "",
    size: 36,
    enableSorting: false,
    cell: ({ getValue }) => (
      <Avatar size="2xs">
        <AvatarFallback name={getValue()} size="2xs" />
      </Avatar>
    ),
    meta: {
      cellClassName: "!px-0 !pr-4 !pl-0",
      headerClassName: "!px-0 !pr-4 !pl-0",
    },
  }) as ColumnDef<Issue, unknown>,
];

/* -- Counts ------------------------------------------------------- */

const active = ISSUES.filter(
  (i) => i.status === "in-progress" || i.status === "todo",
);
const backlog = ISSUES.filter((i) => i.status === "backlog");
const done = ISSUES.filter((i) => i.status === "done");

/* -- Page --------------------------------------------------------- */

export default function LinearDemo() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeTab, setActiveTab] = useState("all");

  const table = useReactTable({
    data: ISSUES,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleTabChange(value: string) {
    setActiveTab(value);
    const statuses = TAB_FILTER_MAP[value];
    if (statuses) {
      setColumnFilters([{ id: "status", value: statuses }]);
    } else {
      setColumnFilters([]);
    }
  }

  const filteredCount = table.getFilteredRowModel().rows.length;

  return (
    <AppShell variant="bordered" className="pb-16">
      {/* -- Sidebar ------------------------------------------------ */}
      <AppShellSidebar width="w-56">
        {/* Workspace */}
        <HStack align="center" gap="xs" noShrink className="px-4 pt-3.5 pb-2">
          <Flex
            align="center"
            justify="center"
            className="size-5 rounded bg-primary"
          >
            <Text size="2xs" className="font-bold text-primary-foreground">
              P
            </Text>
          </Flex>
          <Text size="sm" weight="medium">
            PatternMode
          </Text>
        </HStack>

        {/* Nav */}
        <VStack gap="none" className="px-2 pb-1">
          <MenuItem icon={Inbox} size="xs">
            Inbox
          </MenuItem>
          <MenuItem icon={Search} size="xs">
            Search
          </MenuItem>
          <MenuItem icon={LayoutGrid} size="xs">
            My Issues
          </MenuItem>
        </VStack>

        <ScrollArea className="flex-1">
          <Separator className="my-1" />

          {/* Teams */}
          <VStack gap="none" className="px-1.5 py-1">
            <Text
              size="2xs"
              variant="muted"
              weight="medium"
              className="px-2 pb-1"
            >
              Your Teams
            </Text>
            {TEAMS.map((team) => (
              <MenuItem
                key={team.name}
                size="xs"
                dotColor={team.color}
                dot="default"
              >
                {team.name}
              </MenuItem>
            ))}
          </VStack>

          <Separator className="my-1" />

          <VStack gap="none" className="px-1.5 py-1">
            <MenuItem icon={Layers} size="xs">
              Views
            </MenuItem>
            <MenuItem icon={Timer} size="xs">
              Cycles
            </MenuItem>
            <MenuItem icon={Users} size="xs">
              Members
            </MenuItem>
          </VStack>
        </ScrollArea>

        {/* Bottom */}
        <VStack noShrink className="px-1.5 pb-2">
          <MenuItem icon={Settings} size="xs">
            Settings
          </MenuItem>
        </VStack>
      </AppShellSidebar>

      {/* -- Main --------------------------------------------------- */}
      <AppShellContent>
        {/* Header */}
        <VStack gap="xs" className="px-4 pt-4 pb-1">
          <Flex align="center" justify="space-between">
            <HStack gap="xs" align="center">
              <Text size="base" weight="semibold">
                Engineering
              </Text>
              <Badge variant="secondary" size="2xs">
                {ISSUES.length}
              </Badge>
            </HStack>
            <HStack gap="2xs">
              <Button variant="ghost" size="sm" icon={ListFilter}>
                Filter
              </Button>
              <Button variant="ghost" size="sm" icon={Hash}>
                Group
              </Button>
              <Button size="sm" icon={Plus}>
                New Issue
              </Button>
            </HStack>
          </Flex>
        </VStack>

        {/* Tabs + DataGrid */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          variant="line"
          size="xs"
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="px-4">
            <TabsTrigger value="all" count={ISSUES.length}>
              All Issues
            </TabsTrigger>
            <TabsTrigger value="active" count={active.length}>
              Active
            </TabsTrigger>
            <TabsTrigger value="backlog" count={backlog.length}>
              Backlog
            </TabsTrigger>
            <TabsTrigger value="done" count={done.length}>
              Done
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <DataGrid
              recordCount={filteredCount}
              table={table}
              tableLayout={{
                dense: true,
                rowBorder: false,
                headerBorder: true,
                headerBackground: false,
                headerSticky: true,
                rowHeight: 36,
              }}
              tableClassNames={{
                headerSticky: "sticky top-0 z-10 bg-background",
              }}
            >
              <DataGridContainer border="none">
                <DataGridTable />
              </DataGridContainer>
            </DataGrid>
          </div>
        </Tabs>
      </AppShellContent>
    </AppShell>
  );
}
