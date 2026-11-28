import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { describe, expect, it } from "vitest";

import {
  columnIdFromDef,
  parseColumnsParam,
  parseFiltersParam,
  parsePxWidth,
  parseSortingParam,
  readGridSearchParams,
  serializeGridState,
} from "./state";

const columnIds = ["name", "status", "variants"];
const defaultSorting: SortingState = [{ desc: true, id: "variants" }];

const base = {
  columnFilters: [],
  columnIds,
  columnOrder: [],
  columnVisibility: {},
  defaultPageSize: 25,
  defaultSorting,
  globalFilter: "",
  pagination: { pageIndex: 0, pageSize: 25 },
  sorting: defaultSorting,
};

describe("DataGrid URL state", () => {
  it("normalizes dot-path accessor keys and pixel widths", () => {
    expect(columnIdFromDef({ accessorKey: "user.name" })).toBe("user_name");
    expect(columnIdFromDef({ accessorKey: "user.name", id: "custom" })).toBe("custom");
    expect(parsePxWidth("190px")).toBe(190);
    expect(parsePxWidth(120)).toBe(120);
    expect(parsePxWidth("25%")).toBeUndefined();
  });

  it("reads several sorts, no sort, and falls back for unknown columns", () => {
    expect(parseSortingParam("status.asc,name.desc", columnIds, defaultSorting)).toStrictEqual([
      { desc: false, id: "status" },
      { desc: true, id: "name" },
    ]);
    expect(parseSortingParam("none", columnIds, defaultSorting)).toStrictEqual([]);
    expect(parseSortingParam("missing.asc", columnIds, defaultSorting)).toStrictEqual(
      defaultSorting,
    );
  });

  it("reads rules on known columns and preserves defaultColumnFilters on empty param", () => {
    const defaults: ColumnFiltersState = [
      { id: "status", value: { operator: "any_of", value: ["ready"] } },
    ];

    expect(parseFiltersParam("", columnIds, defaults)).toStrictEqual(defaults);
    expect(parseFiltersParam("none", columnIds, defaults)).toStrictEqual([]);
    expect(parseFiltersParam("{not json", columnIds, defaults)).toStrictEqual(defaults);

    const valid = JSON.stringify([
      { id: "variants", operator: "between", value: [2, 12] },
      { id: "missing", operator: "is", value: "x" },
    ]);

    expect(parseFiltersParam(valid, columnIds, defaults)).toStrictEqual([
      { id: "variants", value: { operator: "between", value: [2, 12] } },
    ]);
  });

  it("reads shown columns with explicit true entries and protects non-hideable columns", () => {
    expect(parseColumnsParam("variants,name", columnIds)).toStrictEqual({
      columnOrder: ["variants", "name", "status"],
      columnVisibility: { name: true, status: false, variants: true },
    });

    expect(parseColumnsParam("variants", columnIds, new Set(["name"]))).toStrictEqual({
      columnOrder: ["variants", "name", "status"],
      columnVisibility: { name: true, status: false, variants: true },
    });

    expect(parseColumnsParam("", columnIds)).toStrictEqual({
      columnOrder: [],
      columnVisibility: {},
    });
  });

  it("writes nothing for the default view and safely skips non-rule filter values", () => {
    expect(serializeGridState(base)).toStrictEqual({
      cols: null,
      filters: null,
      page: null,
      pageSize: null,
      q: null,
      sort: null,
    });

    const withCustomFilter = serializeGridState({
      ...base,
      columnFilters: [{ id: "name", value: "plain-string-from-custom-filterFn" }],
    });

    expect(withCustomFilter.filters).toBeNull();
  });

  it("serializes cleared default filters as none and clamps huge pageSize values", () => {
    const defaults: ColumnFiltersState = [
      { id: "status", value: { operator: "any_of", value: ["ready"] } },
    ];

    expect(
      serializeGridState({ ...base, columnFilters: [], defaultColumnFilters: defaults }).filters,
    ).toBe("none");

    expect(readGridSearchParams(new URLSearchParams("?q=oak&page=3&pageSize=50000"))).toStrictEqual(
      {
        cols: "",
        filters: "",
        page: 3,
        pageSize: 250,
        q: "oak",
        sort: "",
      },
    );

    expect(
      readGridSearchParams(new URLSearchParams("?orders_q=walnut&orders_page=2"), {
        prefix: "orders",
      }),
    ).toStrictEqual({
      cols: "",
      filters: "",
      page: 2,
      pageSize: null,
      q: "walnut",
      sort: "",
    });
  });
});
