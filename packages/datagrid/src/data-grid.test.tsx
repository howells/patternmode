// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DataGrid } from "./data-grid";
import type { DataGridColumnDef } from "./features";
import { EMPTY_GRID_PARAMS } from "./state";
import { DataGridTable } from "./table";
import type { GridAddress, GridQueryState, SerializedGridParams } from "./types";
import { useDataGrid } from "./use-data-grid";

interface TestRow {
  active: boolean;
  id: string;
  name: string;
  price: number;
  status: "draft" | "ready";
  subRows?: readonly TestRow[];
}

const ROWS: readonly TestRow[] = [
  { active: true, id: "1", name: "Oak console", price: 2100, status: "ready" },
  { active: false, id: "2", name: "Walnut chair", price: 730, status: "draft" },
  { active: true, id: "3", name: "Ash bench", price: 1450, status: "ready" },
];

const COLUMNS: DataGridColumnDef<TestRow>[] = [
  {
    accessorKey: "name",
    footer: ({ table }) => `${table.getFilteredRowModel().rows.length} items`,
    header: "Item",
    meta: { pinned: "left", width: "190px" },
  },
  {
    accessorKey: "status",
    cell: ({ getValue }) => (getValue<TestRow["status"]>() === "ready" ? "Spec ready" : "Draft"),
    header: "Status",
    meta: {
      filter: {
        kind: "option",
        options: [
          { label: "Spec ready", tone: "positive", value: "ready" },
          { label: "Draft", tone: "warning", value: "draft" },
        ],
      },
      pinned: "left",
      width: "120px",
    },
  },
  {
    accessorKey: "price",
    cell: ({ getValue }) => `£${getValue<number>().toLocaleString("en-US")}`,
    footer: ({ table }) => {
      const sum = table
        .getFilteredRowModel()
        .rows.reduce((total, row) => total + row.original.price, 0);

      return `£${sum.toLocaleString("en-US")}`;
    },
    header: "Price",
    meta: { align: "right", pinned: "right", width: "110px" },
  },
];

const ComposableGrid = () => {
  const { bindScope, ...grid } = useDataGrid({
    columns: COLUMNS,
    data: ROWS,
    getRowId: (row) => row.id,
  });

  const handleOpenFilter = (columnId: string) => {
    grid.openFilterChannel.open(columnId);
  };

  return (
    <div
      ref={(node) => {
        bindScope(node);
      }}
    >
      <DataGridTable onOpenFilter={handleOpenFilter} specs={grid.specs} table={grid.table} />
    </div>
  );
};

describe(DataGrid, () => {
  afterEach(cleanup);

  it("computes accurate multi-pin start/end offsets and pin-ordered colgroup widths", () => {
    const { container } = render(<DataGrid columns={COLUMNS} data={ROWS} layout="inline" />);

    const cols = [...container.querySelectorAll("colgroup col")];
    const headers = [...container.querySelectorAll("thead th")];

    expect(cols.map((col) => (col instanceof HTMLElement ? col.style.width : ""))).toStrictEqual([
      "190px",
      "120px",
      "110px",
    ]);
    expect(headers[0] instanceof HTMLElement ? headers[0].dataset.pinned : "").toBe("start");
    expect(headers[1] instanceof HTMLElement ? headers[1].style.left : "").toBe("190px");
    expect(headers[2] instanceof HTMLElement ? headers[2].dataset.pinned : "").toBe("end");
    expect(headers[2] instanceof HTMLElement ? headers[2].style.right : "").toBe("0px");
  });

  it("matches formatted option labels in global search", () => {
    render(<DataGrid columns={COLUMNS} data={ROWS} layout="inline" />);

    const search = screen.getByRole("searchbox", { name: "Search" });
    fireEvent.change(search, { target: { value: "Spec ready" } });
    fireEvent.keyDown(search, { key: "Enter" });

    expect(screen.getByText("Oak console")).toBeDefined();
    expect(screen.queryByText("Walnut chair")).toBeNull();
  });

  it("keeps table headers mounted on empty filter state and restores rows via Clear filters", () => {
    render(
      <DataGrid
        columns={COLUMNS}
        data={ROWS}
        defaultColumnFilters={[{ id: "price", value: { operator: "gt", value: 9999 } }]}
        emptyMessage="Nothing here"
        layout="inline"
      />,
    );

    expect(screen.getByText("Nothing here")).toBeDefined();
    expect(screen.getByText("Item")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByText("Oak console")).toBeDefined();
  });

  it("renders real accessible links for getRowHref and intercepts plain left-clicks", () => {
    const onNavigate = vi.fn<(href: string) => void>();

    render(
      <DataGrid
        columns={COLUMNS}
        data={ROWS}
        getRowHref={(row) => `/items/${row.id}`}
        layout="inline"
        onNavigate={onNavigate}
      />,
    );

    const link = screen.getByRole("link", { name: "Oak console" });
    expect(link.getAttribute("href")).toBe("/items/1");

    fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledExactlyOnceWith("/items/1");
  });

  it("sets aria-sort only on the primary sorted column during multi-sort", () => {
    const { container } = render(
      <DataGrid
        columns={COLUMNS}
        data={ROWS}
        defaultSorting={[
          { desc: false, id: "status" },
          { desc: true, id: "price" },
        ]}
        layout="inline"
      />,
    );

    const headers = [...container.querySelectorAll("thead th")];
    const ariaSorts = headers.map((header) => header.getAttribute("aria-sort"));

    expect(ariaSorts).toStrictEqual([null, "ascending", null]);
  });

  it("honors defaultColumnFilters when an external URL address has empty filters", () => {
    const writes: SerializedGridParams[] = [];
    const address: GridAddress = {
      params: EMPTY_GRID_PARAMS,
      write: (values) => {
        writes.push(values);
      },
    };

    render(
      <DataGrid
        address={address}
        columns={COLUMNS}
        data={ROWS}
        defaultColumnFilters={[{ id: "status", value: { operator: "any_of", value: ["ready"] } }]}
        layout="inline"
      />,
    );

    expect(screen.getByText("Oak console")).toBeDefined();
    expect(screen.queryByText("Walnut chair")).toBeNull();
    expect(writes).toHaveLength(0);
  });

  it("supports opt-in row selection with bulk actions bar", () => {
    const onArchive = vi.fn<(ids: readonly string[]) => void>();

    render(
      <DataGrid
        columns={COLUMNS}
        data={ROWS}
        getRowId={(row) => row.id}
        layout="inline"
        selectable
        selectionActions={({ selectedIds }) => (
          <button
            onClick={() => {
              onArchive(selectedIds);
            }}
            type="button"
          >
            Archive
          </button>
        )}
      />,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }));
    expect(screen.getByText("1 selected")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "Archive" }));
    expect(onArchive).toHaveBeenCalledExactlyOnceWith(["1"]);
  });

  it("counts root rows accurately in tree pagination and preserves fold state via getRowId", () => {
    const treeData: TestRow[] = [
      {
        active: true,
        id: "sec-a",
        name: "Section A",
        price: 0,
        status: "ready",
        subRows: [
          { active: true, id: "a-1", name: "Child A1", price: 100, status: "ready" },
          { active: true, id: "a-2", name: "Child A2", price: 200, status: "ready" },
        ],
      },
    ];

    const { container } = render(
      <DataGrid
        columns={COLUMNS}
        data={treeData}
        getRowId={(row) => row.id}
        getSubRows={(row) => row.subRows}
        layout="inline"
        paging
        sectionOf={(row, depth) => (depth === 0 ? row.name : null)}
      />,
    );

    expect(container.textContent).toContain("1–1 of 1");
    expect(screen.getByText("Child A1")).toBeDefined();
  });

  it("supports loading skeletons, error retry, and manual server query callbacks", () => {
    const onRetry = vi.fn<() => void>();
    const onQueryChange = vi.fn<(query: GridQueryState) => void>();

    const { rerender } = render(
      <DataGrid
        columns={COLUMNS}
        data={[]}
        error="Failed to load records"
        layout="inline"
        manual
        onQueryChange={onQueryChange}
        onRetry={onRetry}
        rowCount={120}
      />,
    );

    expect(screen.getByText("Failed to load records")).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();

    rerender(
      <DataGrid
        columns={COLUMNS}
        data={ROWS}
        layout="inline"
        manual
        onQueryChange={onQueryChange}
        rowCount={120}
      />,
    );

    const search = screen.getByRole("searchbox", { name: "Search" });
    fireEvent.change(search, { target: { value: "oak" } });
    fireEvent.keyDown(search, { key: "Enter" });
    expect(onQueryChange).toHaveBeenCalledOnce();
  });

  it("handles custom filterFn values safely, supports resizing, and exposes useDataGrid", () => {
    const customColumns: DataGridColumnDef<TestRow>[] = [
      { accessorKey: "name", filterFn: "includesString", header: "Item", meta: { width: "180px" } },
      { accessorKey: "price", header: "Price", meta: { width: "120px" } },
    ];

    render(
      <DataGrid
        columns={customColumns}
        data={ROWS}
        defaultColumnFilters={[{ id: "name", value: "oak" }]}
        layout="inline"
        resizable
      />,
    );

    expect(screen.getByText("Oak console")).toBeDefined();
    expect(screen.getByRole("button", { name: "Resize Item column" })).toBeDefined();

    cleanup();
    render(<ComposableGrid />);
    expect(screen.getByText("Walnut chair")).toBeDefined();
  });
});
