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
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
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
  BarChart3,
  Filter,
  Minus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

/* -- Types --------------------------------------------------------------- */

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

/* -- Data ---------------------------------------------------------------- */

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

/* -- Helpers ------------------------------------------------------------- */

function TrendArrow({
  trend,
  delta,
}: {
  trend: "up" | "down" | "flat";
  delta: number;
}) {
  if (trend === "flat") {
    return <Icon icon={Minus} size="2xs" className="text-muted-foreground" />;
  }
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
  delta,
}: {
  label: string;
  value: string;
  sub: string;
  trend: "up" | "down" | "flat";
  delta: number;
}) {
  const isUp = trend === "up";
  return (
    <Card variant="card" border="solid" className="px-4 py-3 gap-1.5">
      <Text
        size="2xs"
        variant="muted"
        weight="medium"
        className="uppercase tracking-wider"
      >
        {label}
      </Text>
      <HStack align="baseline" gap="xs">
        <Text size="2xl" weight="semibold" tabularNums className="leading-none">
          {value}
        </Text>
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
            weight="medium"
          >
            {delta > 0 ? "+" : ""}
            {delta.toFixed(1)}%
          </Text>
        </HStack>
      </HStack>
      <Text size="2xs" variant="muted" tabularNums>
        {sub}
      </Text>
    </Card>
  );
}

function ShareBar({ brand, maxShare }: { brand: Brand; maxShare: number }) {
  const delta = brand.share - brand.prevShare;
  const widthPercent = (brand.share / maxShare) * 100;

  return (
    <HStack gap="sm" align="center" className="h-6">
      <Text
        size="2xs"
        className="w-24 shrink-0 text-foreground/80"
        weight="medium"
        truncate
      >
        {brand.name}
      </Text>
      <div className="relative flex-1 h-2 bg-foreground/[0.04] rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-indigo-500/40 transition-all duration-500"
          style={{ width: `${widthPercent}%` }}
        />
      </div>
      <Text
        size="2xs"
        tabularNums
        className="w-12 shrink-0 text-right font-medium"
      >
        {brand.share}%
      </Text>
      <div className="w-14 shrink-0">
        <TrendArrow trend={brand.trend} delta={delta} />
      </div>
    </HStack>
  );
}

function SeverityDot({ severity }: { severity: Activity["severity"] }) {
  const variant =
    severity === "critical"
      ? "destructive"
      : severity === "warning"
        ? "warning"
        : "info";
  return <Dot variant={variant} size="xs" />;
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
    size: 90,
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
    size: 100,
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
  brandColumnHelper.display({
    id: "cospec",
    header: "Co-Spec",
    size: 140,
    enableSorting: false,
    cell: ({ row }) => {
      const match = CO_SPECS.find(
        (c) =>
          BRANDS.indexOf(row.original) < 4 &&
          CO_SPECS.indexOf(c) === BRANDS.indexOf(row.original),
      );
      if (!match)
        return (
          <Text size="2xs" variant="muted">
            --
          </Text>
        );
      return (
        <HStack gap="xs" align="center">
          <Text size="2xs" variant="muted" truncate>
            {match.brand}
          </Text>
          <Text
            size="2xs"
            tabularNums
            font="mono"
            className={
              match.correlation > 0.7
                ? "text-emerald-600"
                : "text-foreground/50"
            }
          >
            {(match.correlation * 100).toFixed(0)}%
          </Text>
        </HStack>
      );
    },
  }) as ColumnDef<Brand, unknown>,
];

/* -- Page ---------------------------------------------------------------- */

export default function IntelligencePage() {
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

  const maxShare = Math.max(...BRANDS.map((b) => b.share));

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-muted/50">
      {/* Top bar */}
      <Flex
        align="center"
        justify="space-between"
        noShrink
        className="border-b border-border/40 bg-background px-5 py-2.5"
      >
        <HStack gap="sm" align="center">
          <Flex
            align="center"
            justify="center"
            className="size-6 rounded-md bg-foreground"
          >
            <BarChart3 className="size-3.5 text-background" />
          </Flex>
          <Text size="sm" weight="semibold">
            Intelligence
          </Text>
          <Separator orientation="vertical" className="mx-1 h-4" />
          <Badge variant="secondary" size="xs" appearance="outline">
            Q1 2026
          </Badge>
          <Badge variant="secondary" size="xs" appearance="outline">
            Seating
          </Badge>
        </HStack>
        <HStack gap="sm" align="center">
          <div className="w-52">
            <InputGroup size="sm" radius="rounded">
              <InputGroupIcon icon={Search} />
              <InputGroupInput placeholder="Search brands..." />
            </InputGroup>
          </div>
          <Button size="xs" variant="ghost" icon={Filter}>
            Filter
          </Button>
          <Button size="xs" variant="ghost" icon={SlidersHorizontal}>
            Configure
          </Button>
        </HStack>
      </Flex>

      {/* Scrollable bento grid content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="grid grid-cols-4 gap-3">
            {/* --- Row 1: KPI cards --- */}
            <KpiCard
              label="Spec Volume"
              value="6,974"
              sub="vs 5,891 prev quarter"
              trend="up"
              delta={18.4}
            />
            <KpiCard
              label="Active Brands"
              value="148"
              sub="+12 new entrants"
              trend="up"
              delta={8.8}
            />
            <KpiCard
              label="Avg Unit Price"
              value="$2,340"
              sub="vs $2,180 prev quarter"
              trend="up"
              delta={7.3}
            />
            <KpiCard
              label="Substitution Rate"
              value="8.2%"
              sub="vs 6.7% prev quarter"
              trend="down"
              delta={-1.5}
            />

            {/* --- Row 2: Market Share (3 cols) + Activity (1 col, 2 rows) --- */}
            <Card
              variant="card"
              border="solid"
              className="col-span-3 px-4 py-3 gap-2"
            >
              <HStack align="center" justify="space-between">
                <HStack gap="xs" align="center">
                  <Text size="xs" weight="semibold">
                    Market Share
                  </Text>
                  <Text size="2xs" variant="muted">
                    Top 12 by spec volume
                  </Text>
                </HStack>
                <HStack gap="xs" align="center">
                  {CO_SPECS.slice(0, 3).map((spec) => (
                    <Badge
                      key={spec.brand}
                      variant="secondary"
                      size="xs"
                      appearance="outline"
                    >
                      {spec.brand}{" "}
                      <Text
                        size="2xs"
                        tabularNums
                        font="mono"
                        className="text-emerald-600"
                        asChild
                      >
                        <span>{(spec.correlation * 100).toFixed(0)}%</span>
                      </Text>
                    </Badge>
                  ))}
                </HStack>
              </HStack>
              <VStack gap="2xs">
                {BRANDS.map((b) => (
                  <ShareBar key={b.name} brand={b} maxShare={maxShare} />
                ))}
              </VStack>
            </Card>

            {/* Activity feed — tall card spanning 2 rows */}
            <Card
              variant="card"
              border="solid"
              className="row-span-2 px-0 py-0 gap-0 overflow-hidden"
            >
              <Flex
                align="center"
                justify="space-between"
                className="px-3.5 py-2.5 border-b border-border/50"
              >
                <HStack gap="xs" align="center">
                  <Text size="xs" weight="semibold">
                    Signals
                  </Text>
                  <Badge variant="destructive" size="xs">
                    {ALERTS.filter((a) => a.severity === "critical").length}
                  </Badge>
                </HStack>
                <Text size="2xs" variant="muted">
                  Last 7d
                </Text>
              </Flex>
              <ScrollArea className="flex-1">
                <VStack gap="none">
                  {ALERTS.map((alert) => (
                    <div
                      key={alert.id}
                      className="px-3.5 py-2 border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <HStack gap="sm" align="flex-start">
                        <div className="mt-1">
                          <SeverityDot severity={alert.severity} />
                        </div>
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
                          <Text
                            size="2xs"
                            variant="muted"
                            className="leading-relaxed"
                          >
                            {alert.detail}
                          </Text>
                          <Text
                            size="2xs"
                            variant="muted"
                            tabularNums
                            className="mt-0.5 opacity-50"
                          >
                            {alert.time} ago
                          </Text>
                        </VStack>
                      </HStack>
                    </div>
                  ))}
                </VStack>
              </ScrollArea>
            </Card>

            {/* --- Row 3 (sits under Market Share): Co-Specification mini cards --- */}
            <Card
              variant="card"
              border="solid"
              className="col-span-3 px-4 py-3 gap-2"
            >
              <HStack align="center" justify="space-between">
                <Text size="xs" weight="semibold">
                  Co-Specified Brands
                </Text>
                <Text size="2xs" variant="muted">
                  Correlation with seating specs
                </Text>
              </HStack>
              <div className="grid grid-cols-6 gap-2">
                {CO_SPECS.map((spec) => {
                  const barWidth = spec.correlation * 100;
                  return (
                    <div
                      key={spec.brand}
                      className="rounded-md border border-border/50 bg-muted/30 px-3 py-2.5 space-y-1.5"
                    >
                      <HStack align="center" justify="space-between">
                        <Text size="2xs" weight="medium">
                          {spec.brand}
                        </Text>
                        <Text
                          size="2xs"
                          tabularNums
                          font="mono"
                          weight="medium"
                          className={
                            spec.correlation > 0.7
                              ? "text-emerald-600"
                              : spec.correlation > 0.6
                                ? "text-foreground/60"
                                : "text-foreground/40"
                          }
                        >
                          {(spec.correlation * 100).toFixed(0)}%
                        </Text>
                      </HStack>
                      <div className="h-1 bg-foreground/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-500/30"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <Text size="2xs" variant="muted" tabularNums>
                        {spec.frequency} specs
                      </Text>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* --- Row 4: Brand table (full width) --- */}
            <Card
              variant="card"
              className="col-span-4 px-0 py-0 gap-0 overflow-hidden"
            >
              <Flex
                align="center"
                justify="space-between"
                className="px-4 py-2.5 border-b border-border/50"
              >
                <HStack gap="xs" align="center">
                  <Text size="xs" weight="semibold">
                    Brand Performance
                  </Text>
                  <Text size="2xs" variant="muted" tabularNums>
                    {BRANDS.length} brands
                  </Text>
                </HStack>
                <HStack gap="xs" align="center">
                  <Button size="xs" variant="ghost">
                    Export
                  </Button>
                </HStack>
              </Flex>
              <DataGrid
                recordCount={BRANDS.length}
                table={table}
                tableLayout={{
                  dense: true,
                  rowBorder: true,
                  headerBorder: true,
                  headerBackground: false,
                  rowHeight: 36,
                }}
              >
                <DataGridContainer border="none">
                  <DataGridTable />
                </DataGridContainer>
              </DataGrid>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
