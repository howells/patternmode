import { describe, expect, it, vi } from "vitest";
import {
  canMoveColumn,
  getHeaderControlsState,
  getVisibilityColumnOptions,
  moveColumnOrder,
} from "./data-grid-column-header-utils";

describe("data-grid-column-header-utils", () => {
  it("moves columns left and right within the current order", () => {
    expect(moveColumnOrder("b", ["a", "b", "c"], "left")).toEqual([
      "b",
      "a",
      "c",
    ]);
    expect(moveColumnOrder("b", ["a", "b", "c"], "right")).toEqual([
      "a",
      "c",
      "b",
    ]);
    expect(moveColumnOrder("a", ["a", "b", "c"], "left")).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("reports whether a column can move in each direction", () => {
    expect(canMoveColumn("b", ["a", "b", "c"], "left")).toBe(true);
    expect(canMoveColumn("b", ["a", "b", "c"], "right")).toBe(true);
    expect(canMoveColumn("a", ["a", "b", "c"], "left")).toBe(false);
    expect(canMoveColumn("c", ["a", "b", "c"], "right")).toBe(false);
  });

  it("derives menu and separator visibility from header capabilities", () => {
    expect(
      getHeaderControlsState({
        canPin: true,
        canSort: true,
        columnsMovable: true,
        columnsPinnable: true,
        columnsVisibility: true,
        hasFilter: true,
        visibility: true,
      }),
    ).toEqual({
      canShowPinMenu: true,
      canShowVisibilityMenu: true,
      showControlsSeparator: true,
      showFilterSeparator: true,
      showHeaderButton: true,
      showHeaderControls: true,
      showMoveMenu: true,
      showVisibilitySeparator: true,
    });
  });

  it("builds visibility menu options from hideable accessor columns", () => {
    const toggleVisibility = vi.fn();

    const options = getVisibilityColumnOptions([
      {
        accessorFn: () => "value",
        columnDef: {
          meta: {
            headerTitle: "Visible Name",
          },
        },
        getCanHide: () => true,
        getIsVisible: () => true,
        id: "visible-column",
        toggleVisibility,
      },
      {
        accessorFn: undefined,
        columnDef: {},
        getCanHide: () => true,
        getIsVisible: () => true,
        id: "display-only",
        toggleVisibility: vi.fn(),
      },
      {
        accessorFn: () => "value",
        columnDef: {},
        getCanHide: () => false,
        getIsVisible: () => true,
        id: "locked-column",
        toggleVisibility: vi.fn(),
      },
    ]);

    expect(options).toEqual([
      {
        id: "visible-column",
        isVisible: true,
        label: "Visible Name",
        toggleVisibility: expect.any(Function),
      },
    ]);

    options[0]?.toggleVisibility(false);
    expect(toggleVisibility).toHaveBeenCalledWith(false);
  });
});
