"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@patternmode/ui/components/collapsible";
import { Dot } from "@patternmode/ui/components/dot";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui/components/tabs";
import { Text } from "@patternmode/ui/components/text";
import { Textarea } from "@patternmode/ui/components/textarea";
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
  createColumnHelper,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Database,
  FileJson,
  FolderOpen,
  Globe,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type DocumentStatus = "active" | "inactive" | "pending" | "archived";

interface UserDocument {
  id: string;
  name: string;
  email: string;
  status: DocumentStatus;
  role: string;
  createdAt: string;
  lastLogin: string;
  region: string;
  plan: string;
}

const DOCUMENTS: UserDocument[] = [
  {
    id: "usr_01HQ3A9V7X",
    name: "Ada Lovelace",
    email: "ada@example.dev",
    status: "active",
    role: "admin",
    createdAt: "2025-11-02T08:14:33Z",
    lastLogin: "2026-04-06T19:42:11Z",
    region: "us-east-1",
    plan: "enterprise",
  },
  {
    id: "usr_01HQ3B2K8Y",
    name: "Grace Hopper",
    email: "grace@example.dev",
    status: "active",
    role: "editor",
    createdAt: "2025-12-18T14:27:09Z",
    lastLogin: "2026-04-05T11:03:47Z",
    region: "eu-west-1",
    plan: "pro",
  },
  {
    id: "usr_01HQ3C5M9Z",
    name: "Alan Turing",
    email: "alan@example.dev",
    status: "inactive",
    role: "viewer",
    createdAt: "2025-09-30T22:51:16Z",
    lastLogin: "2026-02-14T06:18:22Z",
    region: "us-east-1",
    plan: "free",
  },
  {
    id: "usr_01HQ3D8N0A",
    name: "Margaret Hamilton",
    email: "margaret@example.dev",
    status: "active",
    role: "admin",
    createdAt: "2025-10-15T03:09:44Z",
    lastLogin: "2026-04-07T01:55:38Z",
    region: "ap-southeast-1",
    plan: "enterprise",
  },
  {
    id: "usr_01HQ3E1P1B",
    name: "Dennis Ritchie",
    email: "dennis@example.dev",
    status: "archived",
    role: "editor",
    createdAt: "2025-08-22T17:33:01Z",
    lastLogin: "2025-12-01T09:27:55Z",
    region: "us-west-2",
    plan: "pro",
  },
  {
    id: "usr_01HQ3F4Q2C",
    name: "Barbara Liskov",
    email: "barbara@example.dev",
    status: "active",
    role: "editor",
    createdAt: "2026-01-04T10:44:29Z",
    lastLogin: "2026-04-06T16:08:12Z",
    region: "eu-west-1",
    plan: "pro",
  },
  {
    id: "usr_01HQ3G7R3D",
    name: "Linus Torvalds",
    email: "linus@example.dev",
    status: "pending",
    role: "viewer",
    createdAt: "2026-03-28T21:16:53Z",
    lastLogin: "2026-03-28T21:16:53Z",
    region: "eu-central-1",
    plan: "free",
  },
  {
    id: "usr_01HQ3H0S4E",
    name: "Vint Cerf",
    email: "vint@example.dev",
    status: "active",
    role: "admin",
    createdAt: "2025-07-11T05:02:18Z",
    lastLogin: "2026-04-04T13:29:06Z",
    region: "us-east-1",
    plan: "enterprise",
  },
  {
    id: "usr_01HQ3J3T5F",
    name: "Radia Perlman",
    email: "radia@example.dev",
    status: "inactive",
    role: "viewer",
    createdAt: "2025-11-20T12:38:41Z",
    lastLogin: "2026-01-09T08:47:33Z",
    region: "us-west-2",
    plan: "free",
  },
  {
    id: "usr_01HQ3K6U6G",
    name: "Ken Thompson",
    email: "ken@example.dev",
    status: "active",
    role: "editor",
    createdAt: "2025-10-03T19:55:07Z",
    lastLogin: "2026-04-03T22:14:59Z",
    region: "ap-southeast-1",
    plan: "pro",
  },
];

const STATUS_BADGE_VARIANT: Record<
  DocumentStatus,
  "affirmative" | "destructive" | "warning" | "default"
> = {
  active: "affirmative",
  inactive: "destructive",
  pending: "warning",
  archived: "default",
};

const COLLECTIONS = ["users", "sessions", "events", "billing", "audit_logs"];

const DEFAULT_QUERY = `SELECT *
FROM users
WHERE status = 'active'
ORDER BY createdAt DESC
OFFSET 0 LIMIT 20`;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TreeNode({
  icon,
  label,
  depth = 0,
  isActive = false,
  suffix,
  onClick,
}: {
  icon: typeof Database;
  label: string;
  depth?: number;
  isActive?: boolean;
  suffix?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={`flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-left text-xs transition-colors hover:bg-accent/50 ${
        isActive ? "bg-accent text-accent-foreground" : "text-foreground"
      }`}
      onClick={onClick}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
      type="button"
    >
      <Icon className="shrink-0 text-muted-foreground" icon={icon} size="2xs" />
      <span className="flex-1 truncate">{label}</span>
      {suffix}
    </button>
  );
}

function CollectionTree({
  activeCollection,
  onSelect,
}: {
  activeCollection: string;
  onSelect: (name: string) => void;
}) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <button
          className="flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-left text-xs font-medium text-foreground transition-colors hover:bg-accent/50"
          type="button"
        >
          <Icon
            className="shrink-0 text-muted-foreground"
            icon={Database}
            size="2xs"
          />
          <span className="flex-1 truncate">datastore-prod</span>
          <Icon
            className="shrink-0 text-muted-foreground [[data-state=open]_&]:hidden"
            icon={ChevronRight}
            size="2xs"
          />
          <Icon
            className="shrink-0 text-muted-foreground [[data-state=closed]_&]:hidden"
            icon={ChevronDown}
            size="2xs"
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <button
              className="flex w-full items-center gap-1.5 rounded-sm px-2 py-1 text-left text-xs text-foreground transition-colors hover:bg-accent/50"
              style={{ paddingLeft: "20px" }}
              type="button"
            >
              <Icon
                className="shrink-0 text-muted-foreground"
                icon={FolderOpen}
                size="2xs"
              />
              <span className="flex-1 truncate">Collections</span>
              <Text tabularNums size="2xs" variant="muted">
                {COLLECTIONS.length}
              </Text>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <VStack gap="none">
              {COLLECTIONS.map((col) => (
                <TreeNode
                  key={col}
                  depth={3}
                  icon={FileJson}
                  isActive={col === activeCollection}
                  label={col}
                  onClick={() => onSelect(col)}
                  suffix={
                    col === "users" ? (
                      <Text tabularNums size="2xs" variant="muted">
                        {DOCUMENTS.length}
                      </Text>
                    ) : undefined
                  }
                />
              ))}
            </VStack>
          </CollapsibleContent>
        </Collapsible>
      </CollapsibleContent>
    </Collapsible>
  );
}

function DocumentDetailPanel({
  document: doc,
}: {
  document: UserDocument | null;
}) {
  if (!doc) {
    return (
      <Flex
        align="center"
        className="p-6"
        direction="column"
        grow
        justify="center"
      >
        <Text size="sm" variant="muted">
          Select a document to view details
        </Text>
      </Flex>
    );
  }

  const entries: [string, string][] = [
    ["id", doc.id],
    ["name", doc.name],
    ["email", doc.email],
    ["status", doc.status],
    ["role", doc.role],
    ["plan", doc.plan],
    ["region", doc.region],
    ["createdAt", doc.createdAt],
    ["lastLogin", doc.lastLogin.replace("T", " ").replace("Z", "")],
  ];

  return (
    <VStack gap="none" grow>
      {/* Detail header */}
      <Flex
        align="center"
        className="border-b border-border px-3 py-2"
        justify="space-between"
        noShrink
      >
        <HStack align="center" gap="xs">
          <Icon className="text-muted-foreground" icon={FileJson} size="xs" />
          <Text size="xs" weight="medium">
            {doc.id}
          </Text>
        </HStack>
        <Button
          aria-label="Copy document ID"
          icon={Copy}
          size="icon-2xs"
          variant="ghost"
        />
      </Flex>

      {/* Key-value pairs */}
      <ScrollArea className="flex-1">
        <VStack className="p-3" gap="none">
          {entries.map(([key, value]) => (
            <Flex
              key={key}
              align="flex-start"
              className="border-b border-border/50 py-1.5"
              gap="sm"
            >
              <Text
                className="w-20 shrink-0"
                font="mono"
                size="2xs"
                variant="muted"
              >
                {key}
              </Text>
              <Text className="min-w-0 break-all" font="mono" size="2xs">
                {value}
              </Text>
            </Flex>
          ))}
        </VStack>
      </ScrollArea>

      {/* Action buttons */}
      <Flex className="border-t border-border p-3" gap="xs" noShrink>
        <Button className="flex-1" icon={Pencil} size="sm" variant="outline">
          Edit
        </Button>
        <Button
          className="flex-1"
          icon={Trash2}
          size="sm"
          variant="destructive"
          appearance="outline"
        >
          Delete
        </Button>
      </Flex>
    </VStack>
  );
}

const documentColumnHelper = createColumnHelper<UserDocument>();

const statusOptions: FilterOption[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
  { label: "Archived", value: "archived" },
];

const roleOptions: FilterOption[] = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

const planOptions: FilterOption[] = [
  { label: "Enterprise", value: "enterprise" },
  { label: "Pro", value: "pro" },
  { label: "Free", value: "free" },
];

const documentColumns: ColumnDef<UserDocument, unknown>[] = [
  documentColumnHelper.accessor("id", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>id</DataGridFilterableHeader>
    ),
    size: 144,
    enableSorting: true,
    cell: ({ getValue }) => (
      <Text font="mono" size="2xs">
        {getValue()}
      </Text>
    ),
  }) as ColumnDef<UserDocument, unknown>,
  documentColumnHelper.accessor("name", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>name</DataGridFilterableHeader>
    ),
    enableSorting: true,
    cell: ({ getValue }) => <Text size="sm">{getValue()}</Text>,
  }) as ColumnDef<UserDocument, unknown>,
  documentColumnHelper.accessor("status", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column} options={statusOptions}>
        status
      </DataGridFilterableHeader>
    ),
    size: 96,
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue: string[] | undefined) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.original.status);
    },
    cell: ({ getValue }) => (
      <Badge
        appearance="outline"
        size="xs"
        variant={STATUS_BADGE_VARIANT[getValue()]}
      >
        {getValue()}
      </Badge>
    ),
  }) as ColumnDef<UserDocument, unknown>,
  documentColumnHelper.accessor("role", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column} options={roleOptions}>
        role
      </DataGridFilterableHeader>
    ),
    size: 80,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue: string[] | undefined) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.original.role);
    },
    cell: ({ getValue }) => (
      <Text size="xs" variant="muted">
        {getValue()}
      </Text>
    ),
  }) as ColumnDef<UserDocument, unknown>,
  documentColumnHelper.accessor("plan", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column} options={planOptions}>
        plan
      </DataGridFilterableHeader>
    ),
    size: 96,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue: string[] | undefined) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.original.plan);
    },
    cell: ({ getValue }) => (
      <Text size="xs" variant="muted">
        {getValue()}
      </Text>
    ),
  }) as ColumnDef<UserDocument, unknown>,
  documentColumnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>
        createdAt
      </DataGridFilterableHeader>
    ),
    size: 208,
    enableSorting: true,
    cell: ({ getValue }) => (
      <Text font="mono" size="2xs" variant="muted">
        {getValue()}
      </Text>
    ),
  }) as ColumnDef<UserDocument, unknown>,
];

function QueryResultsTable({
  documents,
  selectedId,
  onSelect,
}: {
  documents: UserDocument[];
  selectedId: string | null;
  onSelect: (doc: UserDocument) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const rowSelection = selectedId ? { [selectedId]: true } : {};

  const table = useReactTable({
    data: documents,
    columns: documentColumns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <DataGrid
      onRowClick={onSelect}
      recordCount={documents.length}
      table={table}
      tableClassNames={{
        bodyRow: "data-[state=selected]:!bg-accent",
      }}
      tableLayout={{
        dense: true,
        rowBorder: true,
        headerBorder: true,
        headerBackground: false,
        rowHeight: 44,
      }}
    >
      <DataGridContainer border="none">
        <DataGridTable />
      </DataGridContainer>
    </DataGrid>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function DatastoreDemo() {
  const [activeCollection, setActiveCollection] = useState("users");
  const [selectedDoc, setSelectedDoc] = useState<UserDocument | null>(
    DOCUMENTS[0] ?? null,
  );
  const [queryText, setQueryText] = useState(DEFAULT_QUERY);
  const [queryExecuted, setQueryExecuted] = useState(true);

  const activeDocuments = activeCollection === "users" ? DOCUMENTS : [];

  return (
    <AppShell variant="bordered">
      {/* ----------------------------------------------------------------- */}
      {/* Left panel: Resource tree                                         */}
      {/* ----------------------------------------------------------------- */}
      <AppShellSidebar width="w-60" edge="border">
        {/* Database header */}
        <Flex
          align="center"
          className="border-b border-border px-3 py-2"
          justify="space-between"
          noShrink
        >
          <HStack align="center" gap="xs">
            <Icon className="text-muted-foreground" icon={Database} size="xs" />
            <Text size="sm" weight="semibold">
              Explorer
            </Text>
          </HStack>
          <HStack gap="2xs">
            <Button
              aria-label="Search"
              icon={Search}
              size="icon-2xs"
              variant="ghost"
            />
            <Button
              aria-label="Refresh"
              icon={RefreshCw}
              size="icon-2xs"
              variant="ghost"
            />
          </HStack>
        </Flex>

        {/* Tree */}
        <ScrollArea className="flex-1">
          <VStack className="p-2" gap="none">
            <CollectionTree
              activeCollection={activeCollection}
              onSelect={setActiveCollection}
            />
          </VStack>
        </ScrollArea>

        {/* Bottom actions */}
        <Flex className="border-t border-border p-2" noShrink>
          <Button className="w-full" icon={Plus} size="xs" variant="outline">
            New Collection
          </Button>
        </Flex>
      </AppShellSidebar>

      <AppShellContent className="flex-row">
        {/* ----------------------------------------------------------------- */}
        {/* Center panel: Query / Documents / Settings                        */}
        {/* ----------------------------------------------------------------- */}
        <VStack grow>
          {/* Top bar */}
          <Flex
            align="center"
            className="border-b border-border px-4 py-2"
            justify="space-between"
            noShrink
          >
            <HStack align="center" gap="sm">
              <Text size="sm" weight="semibold" font="mono">
                datastore-prod
              </Text>
              <Separator className="h-4" orientation="vertical" />
              <HStack align="center" gap="xs">
                <Dot size="xs" variant="affirmative" />
                <Text size="xs" variant="muted">
                  Connected
                </Text>
              </HStack>
              <Separator className="h-4" orientation="vertical" />
              <Badge icon={Globe} size="xs" variant="secondary">
                us-east-1
              </Badge>
            </HStack>
            <HStack gap="xs">
              <Badge
                appearance="outline"
                label="RU/s"
                size="xs"
                value="400"
                variant="info"
              />
              <Badge
                appearance="outline"
                label="Docs"
                size="xs"
                value={String(DOCUMENTS.length)}
                variant="secondary"
              />
            </HStack>
          </Flex>

          {/* Tabbed content */}
          <Tabs defaultValue="documents" variant="line" size="sm">
            <Flex className="border-b border-border px-4" noShrink>
              <TabsList>
                <TabsTrigger value="query" icon={Search}>
                  Query
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  icon={FileJson}
                  count={activeDocuments.length}
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger value="settings" icon={Settings}>
                  Settings
                </TabsTrigger>
              </TabsList>
            </Flex>

            <div className="relative isolate grid flex-1 overflow-hidden">
              {/* Query tab */}
              <TabsContent value="query">
                <VStack className="bg-background" grow gap="none">
                  {/* Query input area */}
                  <VStack
                    className="border-b border-border p-4"
                    gap="sm"
                    noShrink
                  >
                    <Textarea
                      className="font-mono text-xs"
                      onChange={(e) => {
                        setQueryText(e.target.value);
                        setQueryExecuted(false);
                      }}
                      placeholder="Enter SQL query..."
                      rows={4}
                      value={queryText}
                    />
                    <Flex align="center" justify="space-between">
                      <Text size="2xs" variant="muted">
                        Target: {activeCollection}
                      </Text>
                      <Button
                        icon={Play}
                        onClick={() => setQueryExecuted(true)}
                        size="sm"
                        variant="default"
                      >
                        Execute
                      </Button>
                    </Flex>
                  </VStack>

                  {/* Query results */}
                  <VStack grow>
                    {queryExecuted ? (
                      <VStack gap="none" grow>
                        <Flex
                          align="center"
                          className="border-b border-border px-4 py-1.5"
                          justify="space-between"
                          noShrink
                        >
                          <Text size="2xs" variant="muted">
                            {activeDocuments.length} results returned in 12ms
                          </Text>
                          <Badge
                            size="xs"
                            variant="affirmative"
                            appearance="outline"
                          >
                            200 OK
                          </Badge>
                        </Flex>
                        <ScrollArea className="flex-1">
                          <QueryResultsTable
                            documents={activeDocuments}
                            onSelect={setSelectedDoc}
                            selectedId={selectedDoc?.id ?? null}
                          />
                        </ScrollArea>
                      </VStack>
                    ) : (
                      <Flex
                        align="center"
                        className="p-8"
                        direction="column"
                        grow
                        justify="center"
                      >
                        <Text size="sm" variant="muted">
                          Press Execute to run your query
                        </Text>
                      </Flex>
                    )}
                  </VStack>
                </VStack>
              </TabsContent>

              {/* Documents tab */}
              <TabsContent value="documents">
                <VStack className="bg-background" grow gap="none">
                  {/* Toolbar */}
                  <Flex
                    align="center"
                    className="border-b border-border px-4 py-1.5"
                    justify="space-between"
                    noShrink
                  >
                    <HStack align="center" gap="xs">
                      <Text font="mono" size="xs" weight="medium">
                        {activeCollection}
                      </Text>
                      <Text size="2xs" variant="muted">
                        {activeDocuments.length} documents
                      </Text>
                    </HStack>
                    <HStack gap="xs">
                      <Button icon={RefreshCw} size="xs" variant="ghost">
                        Refresh
                      </Button>
                      <Button icon={Plus} size="xs" variant="default">
                        New Document
                      </Button>
                    </HStack>
                  </Flex>

                  {/* Document table */}
                  <ScrollArea className="flex-1">
                    <QueryResultsTable
                      documents={activeDocuments}
                      onSelect={setSelectedDoc}
                      selectedId={selectedDoc?.id ?? null}
                    />
                  </ScrollArea>
                </VStack>
              </TabsContent>

              {/* Settings tab */}
              <TabsContent value="settings">
                <VStack className="bg-background p-4" gap="base">
                  <Text size="sm" weight="semibold">
                    Collection Settings
                  </Text>
                  <Separator />
                  <VStack gap="sm">
                    <Flex align="flex-start" gap="lg">
                      <Text className="w-32 shrink-0" size="xs" variant="muted">
                        Collection ID
                      </Text>
                      <Text font="mono" size="xs">
                        {activeCollection}
                      </Text>
                    </Flex>
                    <Flex align="flex-start" gap="lg">
                      <Text className="w-32 shrink-0" size="xs" variant="muted">
                        Partition Key
                      </Text>
                      <Text font="mono" size="xs">
                        /region
                      </Text>
                    </Flex>
                    <Flex align="flex-start" gap="lg">
                      <Text className="w-32 shrink-0" size="xs" variant="muted">
                        Throughput
                      </Text>
                      <Text font="mono" size="xs">
                        400 RU/s (Manual)
                      </Text>
                    </Flex>
                    <Flex align="flex-start" gap="lg">
                      <Text className="w-32 shrink-0" size="xs" variant="muted">
                        Indexing Policy
                      </Text>
                      <Text font="mono" size="xs">
                        Consistent
                      </Text>
                    </Flex>
                    <Flex align="flex-start" gap="lg">
                      <Text className="w-32 shrink-0" size="xs" variant="muted">
                        Default TTL
                      </Text>
                      <Text font="mono" size="xs">
                        Off
                      </Text>
                    </Flex>
                    <Flex align="flex-start" gap="lg">
                      <Text className="w-32 shrink-0" size="xs" variant="muted">
                        Unique Keys
                      </Text>
                      <Text font="mono" size="xs">
                        /email
                      </Text>
                    </Flex>
                  </VStack>
                </VStack>
              </TabsContent>
            </div>
          </Tabs>
        </VStack>

        {/* ----------------------------------------------------------------- */}
        {/* Right panel: Document detail                                      */}
        {/* ----------------------------------------------------------------- */}
        <VStack
          className="w-70 shrink-0 border-l border-border bg-card"
          gap="none"
        >
          <Flex
            align="center"
            className="border-b border-border px-3 py-2"
            justify="space-between"
            noShrink
          >
            <Text size="xs" weight="semibold">
              Document Inspector
            </Text>
            {selectedDoc && (
              <Badge
                appearance="outline"
                size="xs"
                variant={STATUS_BADGE_VARIANT[selectedDoc.status]}
              >
                {selectedDoc.status}
              </Badge>
            )}
          </Flex>
          <DocumentDetailPanel document={selectedDoc} />
        </VStack>
      </AppShellContent>
    </AppShell>
  );
}
