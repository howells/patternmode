"use client";

import "@patternmode/filters/styles.css";
import "@patternmode/datagrid/styles.css";
import "@patternmode/status/styles.css";
import "./datagrid-demo.css";

import { DataGrid, DataGridCellText } from "@patternmode/datagrid";
import type { DataGridColumnDef } from "@patternmode/datagrid";
import { ToolbarControl } from "@patternmode/filters";
import { StatusMark } from "@patternmode/status";
import type { ReactNode } from "react";
import { useState } from "react";

interface SpecRow {
  approved: boolean;
  category: string;
  deliveryDate: string;
  id: string;
  leadWeeks: number;
  name: string;
  notes: string;
  price: number;
  status: "draft" | "ordered" | "ready";
  supplier: string;
}

const SPEC_ROWS: readonly SpecRow[] = [
  {
    approved: true,
    category: "Joinery",
    deliveryDate: "2026-05-12",
    id: "FF-01",
    leadWeeks: 10,
    name: "Fumed oak console",
    notes: "Quarter-sawn European oak with hand-waxed satin oil finish and shadow-gap plinth.",
    price: 4280,
    status: "ready",
    supplier: "Pinch",
  },
  {
    approved: true,
    category: "Seating",
    deliveryDate: "2026-04-28",
    id: "FF-02",
    leadWeeks: 6,
    name: "Bouclé lounge chair",
    notes: "Upholstered in undyed Belgian wool bouclé, oiled walnut frame.",
    price: 1850,
    status: "ordered",
    supplier: "Carl Hansen",
  },
  {
    approved: true,
    category: "Lighting",
    deliveryDate: "2026-04-18",
    id: "FF-03",
    leadWeeks: 4,
    name: "Fluted linen pendant",
    notes: "Warm 2700K dim-to-warm lamping with unlacquered brass ceiling rose.",
    price: 690,
    status: "ready",
    supplier: "Rose Uniacke",
  },
  {
    approved: false,
    category: "Surfaces",
    deliveryDate: "2026-06-04",
    id: "FF-04",
    leadWeeks: 8,
    name: "Honed travertine slab",
    notes: "Unfilled Roman travertine, 20mm honed edge for kitchen island.",
    price: 6400,
    status: "draft",
    supplier: "Lapicida",
  },
  {
    approved: true,
    category: "Lighting",
    deliveryDate: "2026-04-22",
    id: "FF-05",
    leadWeeks: 5,
    name: "Patina bronze wall sconce",
    notes: "Cast bronze backplate with frosted opal glass shade, IP44 rated.",
    price: 540,
    status: "ordered",
    supplier: "Jamb",
  },
  {
    approved: true,
    category: "Textiles",
    deliveryDate: "2026-04-14",
    id: "FF-06",
    leadWeeks: 3,
    name: "Heavyweight Belgian linen drape",
    notes: "Triple pinch pleat, blackout lined, 3.2m drop across drawing room bay.",
    price: 2320,
    status: "ready",
    supplier: "Libeco",
  },
  {
    approved: false,
    category: "Seating",
    deliveryDate: "2026-06-20",
    id: "FF-07",
    leadWeeks: 12,
    name: "Saddle-leather dining bench",
    notes: "Vegetable-tanned cognac hide stitched over solid ash stretchers.",
    price: 3150,
    status: "draft",
    supplier: "De La Espada",
  },
  {
    approved: true,
    category: "Joinery",
    deliveryDate: "2026-05-26",
    id: "FF-08",
    leadWeeks: 9,
    name: "Limed ash bedside cabinet",
    notes: "Soft-close mitred drawer with recessed brass pull.",
    price: 1490,
    status: "ready",
    supplier: "Pinch",
  },
];

const STATUS: Record<
  SpecRow["status"],
  { label: string; step: "empty" | "half" | "full"; tone: "accent" | "muted" }
> = {
  draft: { label: "Draft", step: "empty", tone: "muted" },
  ordered: { label: "Ordered", step: "full", tone: "accent" },
  ready: { label: "Spec ready", step: "half", tone: "accent" },
};

const day = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });
const pounds = new Intl.NumberFormat("en-GB", {
  currency: "GBP",
  maximumFractionDigits: 0,
  style: "currency",
});

const Quiet = ({ children }: { children: ReactNode }) => (
  <span className="text-muted-foreground">{children}</span>
);

const COLUMNS: DataGridColumnDef<SpecRow>[] = [
  {
    accessorKey: "name",
    footer: ({ table }) => `${table.getFilteredRowModel().rows.length} items`,
    header: "Item",
    meta: { minWidth: "180px", pinned: "left", width: "212px" },
  },
  {
    accessorKey: "status",
    cell: ({ getValue }) => {
      const status = STATUS[getValue<SpecRow["status"]>()];

      return (
        <span className="flex items-center gap-2">
          <StatusMark
            size="2xs"
            status={status.step}
            tone={status.tone}
            trackColor="var(--border)"
          />
          {status.label}
        </span>
      );
    },
    header: "Status",
    meta: {
      filter: {
        kind: "option",
        options: [
          { label: "Ordered", tone: "positive", value: "ordered" },
          { label: "Spec ready", tone: "info", value: "ready" },
          { label: "Draft", tone: "warning", value: "draft" },
        ],
      },
      width: "128px",
    },
  },
  {
    accessorKey: "supplier",
    cell: ({ getValue }) => <Quiet>{getValue<string>()}</Quiet>,
    header: "Supplier",
    meta: { width: "128px" },
  },
  {
    accessorKey: "deliveryDate",
    cell: ({ getValue }) => <Quiet>{day.format(new Date(getValue<string>()))}</Quiet>,
    header: "Delivery",
    meta: { filter: { kind: "date" }, hideOnPhone: true, width: "92px" },
  },
  {
    accessorKey: "leadWeeks",
    cell: ({ getValue }) => <Quiet>{getValue<number>()} wk</Quiet>,
    header: "Lead",
    meta: { align: "right", hideOnPhone: true, width: "72px" },
  },
  {
    accessorKey: "approved",
    cell: ({ getValue }) => (getValue<boolean>() ? "Approved" : <Quiet>Waiting</Quiet>),
    header: "Client",
    meta: { filter: { kind: "boolean" }, hideOnPhone: true, width: "100px" },
  },
  {
    accessorKey: "notes",
    cell: ({ getValue }) => (
      <DataGridCellText className="text-muted-foreground" lines={1}>
        {getValue<string>()}
      </DataGridCellText>
    ),
    header: "Specification",
    meta: { hideOnPhone: true, width: "260px" },
  },
  {
    accessorKey: "price",
    cell: ({ getValue }) => pounds.format(getValue<number>()),
    footer: ({ table }) =>
      pounds.format(
        table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.price, 0),
      ),
    header: "Price",
    meta: { align: "right", highlight: true, pinned: "right", width: "104px" },
  },
];

const ExportSelectedAction = ({
  clearSelection,
  onExport,
  selectedRows,
}: {
  clearSelection: () => void;
  onExport: (message: string) => void;
  selectedRows: readonly SpecRow[];
}) => (
  <ToolbarControl
    onClick={() => {
      const total = selectedRows.reduce((sum, row) => sum + row.price, 0);
      onExport(`Exported ${selectedRows.length} items, ${pounds.format(total)}`);
      clearSelection();
    }}
  >
    Export selected
  </ToolbarControl>
);

export const DataGridDemo = () => {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const renderSelectionActions = ({
    clearSelection,
    selectedRows,
  }: {
    clearSelection: () => void;
    selectedRows: readonly SpecRow[];
  }) => (
    <ExportSelectedAction
      clearSelection={clearSelection}
      onExport={setLastAction}
      selectedRows={selectedRows}
    />
  );

  return (
    <div className="datagrid-demo">
      <DataGrid
        columns={COLUMNS}
        data={SPEC_ROWS}
        defaultSorting={[{ desc: true, id: "price" }]}
        getRowId={(row) => row.id}
        layout="inline"
        resizable
        searchPlaceholder="Search schedule"
        selectable
        selectionActions={renderSelectionActions}
      />
      {lastAction === null ? null : (
        <p aria-live="polite" className="m-0 type-label text-muted-foreground">
          {lastAction}
        </p>
      )}
    </div>
  );
};
