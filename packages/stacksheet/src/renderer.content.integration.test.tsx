// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement, Fragment } from "react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createStacksheet } from "./index";

// oxlint-disable-next-line anti-slop/no-module-mocking -- jsdom has no layout, so the real focus trap finds no tabbable element and throws; the stand-in renders its children unchanged.
vi.mock(import("focus-trap-react"), () => ({
  FocusTrap: ({ children }: { children: ReactNode }) => createElement(Fragment, null, children),
}));

const RootSheet = () => <p>Root sheet content</p>;
const NestedSheet = () => <p>Nested sheet content</p>;

describe("SheetRenderer content and dismissal", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn<
        (
          query: string,
        ) => Pick<MediaQueryList, "addEventListener" | "matches" | "removeEventListener">
      >(() => ({
        addEventListener: vi.fn<MediaQueryList["addEventListener"]>(),
        matches: false,
        removeEventListener: vi.fn<MediaQueryList["removeEventListener"]>(),
      })),
    );
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("pops only the Nested Sheet on Escape, then closes the Sheet Stack", async () => {
    const user = userEvent.setup();
    const { StacksheetProvider, store } = createStacksheet<{
      nested: Record<string, never>;
      root: Record<string, never>;
    }>();
    render(
      <StacksheetProvider sheets={{ nested: NestedSheet, root: RootSheet }}>
        <p>App</p>
      </StacksheetProvider>,
    );
    act(() => {
      store.getState().open("root", "root", {}, { ariaLabel: "Root sheet" });
      store.getState().push("nested", "nested", {}, { ariaLabel: "Nested sheet" });
    });
    expect(screen.getByRole("dialog", { name: "Nested sheet" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(store.getState().stack.map((item) => item.id)).toStrictEqual(["root"]);
    expect(screen.getByRole("dialog", { name: "Root sheet" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(store.getState().stack).toHaveLength(0);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a Sheet opened by component", () => {
    const { StacksheetProvider, store } = createStacksheet();
    render(
      <StacksheetProvider>
        <p>App</p>
      </StacksheetProvider>,
    );
    act(() => {
      store.getState().open(NestedSheet, {}, { ariaLabel: "Direct sheet" });
    });
    expect(screen.getByRole("dialog", { name: "Direct sheet" })).toBeInTheDocument();
    expect(screen.getByText("Nested sheet content")).toBeInTheDocument();
  });

  it("throws when a Sheet's type is missing from the sheets map", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const { StacksheetProvider, store } = createStacksheet<{ known: Record<string, never> }>();
    render(
      <StacksheetProvider sheets={{ known: NestedSheet }}>
        <p>App</p>
      </StacksheetProvider>,
    );
    expect(() => {
      act(() => {
        // @ts-expect-error -- "missing" is not a key of the sheets map.
        store.getState().open("missing", "missing", {});
      });
    }).toThrow('No sheet is registered for type "missing"');
    error.mockRestore();
  });
});
