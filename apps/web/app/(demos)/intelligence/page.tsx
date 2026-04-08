"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { Card } from "@patternmode/ui/components/card";
import { Dot } from "@patternmode/ui/components/dot";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import {
  InputGroup,
  InputGroupIcon,
  InputGroupInput,
} from "@patternmode/ui/components/input-group";
import { MenuItem } from "@patternmode/ui/components/menu-item";
import { Progress } from "@patternmode/ui/components/progress";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Tabs, TabsList, TabsTrigger } from "@patternmode/ui/components/tabs";
import { Text } from "@patternmode/ui/components/text";
import {
  AppShell,
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
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bookmark,
  ChevronDown,
  Filter,
  Layers,
  Minus,
  Search,
  Settings,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";

/* -- Data ---------------------------------------------------------------- */

interface Brand {
  name: string;
  share: number;
  prevShare: number;
  volume: number;
  trend: "up" | "down" | "flat";
  tier: "leader" | "challenger" | "niche";
}

interface CoSpec {
  brand: string;
  frequency: number;
  correlation: number;
}

interface Activity {
  id: string;
  event: string;
  category: string;
  detail: string;
  time: string;
  severity: "info" | "warning" | "critical";
}

const CATEGORIES = [
  { name: "All Categories", count: 2847 },
  { name: "Seating", count: 612 },
  { name: "Lighting", count: 489 },
  { name: "Textiles", count: 378 },
  { name: "Flooring", count: 334 },
  { name: "Surfaces", count: 291 },
  { name: "Fixtures", count: 267 },
  { name: "Acoustics", count: 198 },
  { name: "Hardware", count: 156 },
  { name: "Outdoor", count: 122 },
];

const BRANDS: Brand[] = [
  {
    name: "Kettal",
    share: 18.4,
    prevShare: 16.2,
    volume: 1284,
    trend: "up",
    tier: "leader",
  },
  {
    name: "Vitra",
    share: 15.1,
    prevShare: 15.8,
    volume: 1052,
    trend: "down",
    tier: "leader",
  },
  {
    name: "Fritz Hansen",
    share: 12.7,
    prevShare: 11.3,
    volume: 886,
    trend: "up",
    tier: "leader",
  },
  {
    name: "Knoll",
    share: 11.3,
    prevShare: 12.1,
    volume: 788,
    trend: "down",
    tier: "leader",
  },
  {
    name: "Arper",
    share: 8.9,
    prevShare: 7.4,
    volume: 621,
    trend: "up",
    tier: "challenger",
  },
  {
    name: "Muuto",
    share: 7.2,
    prevShare: 6.8,
    volume: 502,
    trend: "up",
    tier: "challenger",
  },
  {
    name: "Hay",
    share: 6.4,
    prevShare: 7.1,
    volume: 446,
    trend: "down",
    tier: "challenger",
  },
  {
    name: "Andreu World",
    share: 5.8,
    prevShare: 5.2,
    volume: 405,
    trend: "up",
    tier: "challenger",
  },
  {
    name: "Pedrali",
    share: 4.1,
    prevShare: 4.6,
    volume: 286,
    trend: "down",
    tier: "niche",
  },
  {
    name: "Molteni&C",
    share: 3.8,
    prevShare: 3.1,
    volume: 265,
    trend: "up",
    tier: "niche",
  },
  {
    name: "Fredericia",
    share: 3.2,
    prevShare: 3.4,
    volume: 223,
    trend: "down",
    tier: "niche",
  },
  {
    name: "Carl Hansen",
    share: 3.1,
    prevShare: 2.6,
    volume: 216,
    trend: "up",
    tier: "niche",
  },
];

const CO_SPECS: CoSpec[] = [
  { brand: "Flos", frequency: 342, correlation: 0.78 },
  { brand: "Kvadrat", frequency: 289, correlation: 0.72 },
  { brand: "Vola", frequency: 214, correlation: 0.65 },
  { brand: "Mutina", frequency: 198, correlation: 0.61 },
  { brand: "Foscarini", frequency: 176, correlation: 0.58 },
  { brand: "Maharam", frequency: 162, correlation: 0.54 },
];

const ALERTS: Activity[] = [
  {
    id: "1",
    event: "Share shift",
    category: "Seating",
    detail: "Kettal overtook Vitra in hospitality spec volume",
    time: "2h",
    severity: "critical",
  },
  {
    id: "2",
    event: "New entrant",
    category: "Lighting",
    detail: "Resident Studio appeared in 12 projects this quarter",
    time: "4h",
    severity: "warning",
  },
  {
    id: "3",
    event: "Substitution",
    category: "Textiles",
    detail: "Kvadrat being replaced by Febrik in 3 hotel chains",
    time: "6h",
    severity: "warning",
  },
  {
    id: "4",
    event: "Velocity spike",
    category: "Flooring",
    detail: "Mutina spec requests up 34% month-over-month",
    time: "1d",
    severity: "info",
  },
  {
    id: "5",
    event: "Co-spec shift",
    category: "Seating",
    detail: "Fritz Hansen + Flos pairing up 28% in Nordic offices",
    time: "1d",
    severity: "info",
  },
  {
    id: "6",
    event: "Category decline",
    category: "Acoustics",
    detail: "Felt panel specifications down 12% vs Q3",
    time: "2d",
    severity: "warning",
  },
  {
    id: "7",
    event: "Price signal",
    category: "Surfaces",
    detail: "Corian alternatives gaining share at -40% price point",
    time: "3d",
    severity: "info",
  },
];

const SAVED_VIEWS = [
  { name: "Hospitality — APAC", count: 34 },
  { name: "Nordic Office", count: 18 },
  { name: "Residential Luxury", count: 27 },
  { name: "Healthcare", count: 12 },
];

/* -- Helpers ------------------------------------------------------------- */

function TrendArrow({
  trend,
  delta,
}: {
  trend: "up" | "down" | "flat";
  delta: number;
}) {
  if (trend === "flat")
    return <Icon icon={Minus} size="2xs" className="text-muted-foreground" />;
  const isUp = trend === "up";
  return (
    <HStack gap="2xs" align="center">
      <Icon
        icon={isUp ? ArrowUp : ArrowDown}
        size="2xs"
        className={isUp ? "text-emerald-500" : "text-red-500"}
      />
      <Text
        size="2xs"
        className={isUp ? "text-emerald-500" : "text-red-500"}
        tabularNums
      >
        {delta > 0 ? "+" : ""}
        {delta.toFixed(1)}
      </Text>
    </HStack>
  );
}

function KpiCard({
  label,
  value,
  sub,
  trend,
}: {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "down";
}) {
  return (
    <Card variant="card" border="solid" className="flex-1 px-5 py-4 gap-1.5">
      <Text size="2xs" variant="muted" weight="medium">
        {label}
      </Text>
      <HStack align="baseline" gap="xs">
        <Text size="xl" weight="semibold" tabularNums>
          {value}
        </Text>
        {trend && (
          <Icon
            icon={trend === "up" ? ArrowUpRight : ArrowDown}
            size="xs"
            className={trend === "up" ? "text-emerald-500" : "text-red-500"}
          />
        )}
      </HStack>
      <Text size="2xs" variant="muted" tabularNums>
        {sub}
      </Text>
    </Card>
  );
}

function ShareBar({ share, name }: { share: number; name: string }) {
  return (
    <HStack gap="sm" align="center" className="min-h-6">
      <Text size="2xs" className="w-24 shrink-0" truncate>
        {name}
      </Text>
      <div className="flex-1">
        <Progress value={share} max={20} size="xs" />
      </div>
      <Text
        size="2xs"
        variant="muted"
        tabularNums
        className="w-10 shrink-0"
        align="right"
      >
        {share}%
      </Text>
    </HStack>
  );
}

/* -- Brand columns ------------------------------------------------------- */

const brandColumnHelper = createColumnHelper<Brand>();

const tierOptions: FilterOption[] = [
  { label: "Leader", value: "leader" },
  { label: "Challenger", value: "challenger" },
  { label: "Niche", value: "niche" },
];

const brandColumns: ColumnDef<Brand, unknown>[] = [
  brandColumnHelper.display({
    id: "status",
    header: "",
    size: 32,
    enableSorting: false,
    cell: ({ row }) => (
      <Dot
        variant={
          row.original.trend === "up"
            ? "affirmative"
            : row.original.trend === "down"
              ? "destructive"
              : "default"
        }
        size="xs"
      />
    ),
  }) as ColumnDef<Brand, unknown>,
  brandColumnHelper.accessor("name", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>Brand</DataGridFilterableHeader>
    ),
    enableSorting: true,
    cell: ({ getValue }) => (
      <Text size="sm" weight="medium">
        {getValue()}
      </Text>
    ),
  }) as ColumnDef<Brand, unknown>,
  brandColumnHelper.accessor("share", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>Share</DataGridFilterableHeader>
    ),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => (
      <Text size="sm" tabularNums>
        {getValue()}%
      </Text>
    ),
  }) as ColumnDef<Brand, unknown>,
  brandColumnHelper.accessor((row) => row.share - row.prevShare, {
    id: "change",
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>
        Change
      </DataGridFilterableHeader>
    ),
    size: 80,
    enableSorting: true,
    cell: ({ row }) => {
      const delta = row.original.share - row.original.prevShare;
      return <TrendArrow trend={row.original.trend} delta={delta} />;
    },
  }) as ColumnDef<Brand, unknown>,
  brandColumnHelper.accessor("volume", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column}>
        Volume
      </DataGridFilterableHeader>
    ),
    size: 80,
    enableSorting: true,
    cell: ({ getValue }) => (
      <Text size="sm" variant="muted" tabularNums>
        {getValue().toLocaleString()}
      </Text>
    ),
  }) as ColumnDef<Brand, unknown>,
  brandColumnHelper.accessor("tier", {
    header: ({ column }) => (
      <DataGridFilterableHeader column={column} options={tierOptions}>
        Tier
      </DataGridFilterableHeader>
    ),
    size: 80,
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue: string[] | undefined) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.original.tier);
    },
    cell: ({ getValue }) => (
      <Badge
        variant={getValue() === "leader" ? "default" : "secondary"}
        size="xs"
        appearance="outline"
      >
        {getValue()}
      </Badge>
    ),
  }) as ColumnDef<Brand, unknown>,
];

/* -- Page ---------------------------------------------------------------- */

export default function IntelligenceDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: BRANDS,
    columns: brandColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <AppShell variant="framed">
      <AppShellSidebar width="w-56">
        {/* Fixed header */}
        <HStack align="center" gap="xs" noShrink className="px-3 py-2.5">
          <Flex
            align="center"
            justify="center"
            className="size-5 rounded bg-foreground"
          >
            <BarChart3 className="size-3 text-background" />
          </Flex>
          <Text size="sm" weight="medium">
            Intelligence
          </Text>
        </HStack>

        {/* Scrollable nav */}
        <ScrollArea className="flex-1">
          <VStack gap="none" className="px-1.5 py-1">
            <MenuItem icon={Layers} size="xs" isActive>
              Overview
            </MenuItem>
            <MenuItem icon={TrendingUp} size="xs">
              Trends
            </MenuItem>
            <MenuItem
              icon={Zap}
              size="xs"
              suffix={
                <Badge variant="destructive" size="xs">
                  3
                </Badge>
              }
            >
              Alerts
            </MenuItem>
          </VStack>

          <Separator className="my-1" />

          <VStack gap="none" className="px-1.5 py-1">
            <Text
              size="2xs"
              variant="muted"
              weight="medium"
              className="px-2 pb-1"
            >
              Categories
            </Text>
            {CATEGORIES.map((cat) => (
              <MenuItem
                key={cat.name}
                size="xs"
                isActive={cat.name === "Seating"}
                suffix={
                  <Text size="2xs" variant="muted" tabularNums>
                    {cat.count}
                  </Text>
                }
              >
                {cat.name}
              </MenuItem>
            ))}
          </VStack>

          <Separator className="my-1" />

          <VStack gap="none" className="px-1.5 py-1">
            <HStack
              align="center"
              justify="space-between"
              className="px-2 pb-1"
            >
              <Text size="2xs" variant="muted" weight="medium">
                Saved Views
              </Text>
              <Icon
                icon={ChevronDown}
                size="2xs"
                className="text-muted-foreground"
              />
            </HStack>
            {SAVED_VIEWS.map((view) => (
              <MenuItem
                key={view.name}
                icon={Bookmark}
                size="xs"
                suffix={
                  <Text size="2xs" variant="muted" tabularNums>
                    {view.count}
                  </Text>
                }
              >
                {view.name}
              </MenuItem>
            ))}
          </VStack>
        </ScrollArea>

        {/* Fixed footer */}
        <VStack noShrink className="px-1.5 pb-2">
          <MenuItem icon={Settings} size="xs">
            Settings
          </MenuItem>
        </VStack>
      </AppShellSidebar>

      {/* Main content — cards sit directly on muted bg */}
      <VStack grow gap="none" className="min-w-0 overflow-hidden">
        {/* Top bar */}
        <Flex
          align="center"
          justify="space-between"
          noShrink
          className="border-b border-border/50 px-4 py-2"
        >
          <HStack gap="sm" align="center">
            <Text size="sm" weight="semibold">
              Seating
            </Text>
            <Badge variant="secondary" size="xs" appearance="outline">
              Q1 2026
            </Badge>
            <Separator orientation="vertical" className="h-4" />
            <Tabs defaultValue="share" variant="pill" size="xs">
              <TabsList>
                <TabsTrigger value="share">Market Share</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="cospec">Co-Specification</TabsTrigger>
              </TabsList>
            </Tabs>
          </HStack>
          <HStack gap="sm" align="center">
            <div className="w-48">
              <InputGroup size="sm" radius="rounded">
                <InputGroupIcon icon={Search} />
                <InputGroupInput placeholder="Search brands..." />
              </InputGroup>
            </div>
            <Button size="xs" variant="ghost" icon={Filter}>
              Filter
            </Button>
            <Button size="xs" variant="ghost" icon={Bell}>
              Alerts
            </Button>
          </HStack>
        </Flex>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <VStack gap="lg" className="p-5">
            {/* KPI row */}
            <HStack gap="sm">
              <KpiCard
                label="Spec Volume"
                value="6,974"
                sub="vs 5,891 prev quarter"
                trend="up"
              />
              <KpiCard
                label="Active Brands"
                value="148"
                sub="+12 new entrants"
                trend="up"
              />
              <KpiCard
                label="Avg Unit Price"
                value="$2,340"
                sub="vs $2,180 prev quarter"
                trend="up"
              />
              <KpiCard
                label="Substitution Rate"
                value="8.2%"
                sub="vs 6.7% prev quarter"
                trend="down"
              />
            </HStack>

            {/* Two-column: Market Share + Co-Specification */}
            <HStack gap="sm" align="stretch">
              {/* Market Share */}
              <Card
                variant="card"
                border="solid"
                className="flex-1 px-4 py-3 gap-3"
              >
                <HStack align="center" justify="space-between">
                  <Text size="xs" weight="semibold">
                    Market Share — Top 8
                  </Text>
                  <Text size="2xs" variant="muted">
                    By spec volume
                  </Text>
                </HStack>
                <VStack gap="xs">
                  {BRANDS.slice(0, 8).map((brand) => (
                    <ShareBar
                      key={brand.name}
                      share={brand.share}
                      name={brand.name}
                    />
                  ))}
                </VStack>
              </Card>

              {/* Co-Specification */}
              <Card
                variant="card"
                border="solid"
                className="w-72 shrink-0 px-4 py-3 gap-3"
              >
                <HStack align="center" justify="space-between">
                  <Text size="xs" weight="semibold">
                    Co-Specified With
                  </Text>
                  <Text size="2xs" variant="muted">
                    Seating category
                  </Text>
                </HStack>
                <VStack gap="xs">
                  {CO_SPECS.map((spec) => (
                    <HStack
                      key={spec.brand}
                      align="center"
                      gap="sm"
                      className="min-h-6"
                    >
                      <Text size="2xs" className="flex-1" truncate>
                        {spec.brand}
                      </Text>
                      <Text size="2xs" variant="muted" tabularNums>
                        {spec.frequency}
                      </Text>
                      <Badge
                        variant={
                          spec.correlation > 0.7
                            ? "affirmative"
                            : spec.correlation > 0.6
                              ? "warning"
                              : "secondary"
                        }
                        size="xs"
                        appearance="outline"
                      >
                        {(spec.correlation * 100).toFixed(0)}%
                      </Badge>
                    </HStack>
                  ))}
                </VStack>
              </Card>
            </HStack>

            {/* Brand table */}
            <Card variant="card" className="px-0 py-0 gap-0 overflow-hidden">
              <Flex
                align="center"
                justify="space-between"
                className="px-4 py-2.5 border-b border-border"
              >
                <Text size="xs" weight="semibold">
                  Brand Performance
                </Text>
                <Text size="xs" variant="muted" tabularNums>
                  {BRANDS.length} brands
                </Text>
              </Flex>
              <DataGrid
                recordCount={BRANDS.length}
                table={table}
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
            </Card>

            {/* Activity feed */}
            <Card
              variant="card"
              border="solid"
              className="px-0 py-0 gap-0 overflow-hidden"
            >
              <Flex
                align="center"
                justify="space-between"
                className="px-4 py-2.5 border-b border-border"
              >
                <HStack gap="xs" align="center">
                  <Text size="xs" weight="semibold">
                    Recent Signals
                  </Text>
                  <Badge variant="destructive" size="xs">
                    {ALERTS.filter((a) => a.severity === "critical").length}{" "}
                    critical
                  </Badge>
                </HStack>
                <Button size="xs" variant="ghost">
                  View all
                </Button>
              </Flex>
              <VStack gap="none">
                {ALERTS.map((alert) => (
                  <Flex
                    key={alert.id}
                    align="center"
                    gap="sm"
                    className="px-4 py-2 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <Dot
                      variant={
                        alert.severity === "critical"
                          ? "destructive"
                          : alert.severity === "warning"
                            ? "warning"
                            : "info"
                      }
                      size="xs"
                    />
                    <VStack gap="none" className="flex-1 min-w-0">
                      <HStack gap="xs" align="center">
                        <Text size="xs" weight="medium">
                          {alert.event}
                        </Text>
                        <Badge
                          variant="secondary"
                          size="xs"
                          appearance="outline"
                        >
                          {alert.category}
                        </Badge>
                      </HStack>
                      <Text size="xs" variant="muted" truncate>
                        {alert.detail}
                      </Text>
                    </VStack>
                    <Text
                      size="2xs"
                      variant="muted"
                      tabularNums
                      className="shrink-0"
                    >
                      {alert.time}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Card>
          </VStack>
        </ScrollArea>
      </VStack>
    </AppShell>
  );
}
