// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SheetPanelContext } from "./panel-context";
import type { SheetPanelContextValue } from "./panel-context";
import { Sheet } from "./parts";

const panel = (): SheetPanelContextValue => ({
  back: vi.fn<() => void>(),
  close: vi.fn<() => void>(),
  hasDescription: false,
  hasTitle: false,
  isNested: true,
  isTop: true,
  panelId: "p",
  registerDescription: vi.fn<() => () => void>(() => vi.fn<() => void>()),
  registerTitle: vi.fn<() => () => void>(() => vi.fn<() => void>()),
  side: "bottom",
});

describe("Sheet.Header", () => {
  afterEach(cleanup);

  it("lays its parts out as a navigation bar, placing each by its data attribute", () => {
    // Written close-first, to show the bar places its parts whatever their order.
    render(
      <SheetPanelContext value={panel()}>
        <Sheet.Header>
          <Sheet.Close />
          <Sheet.Title>Settings</Sheet.Title>
          <Sheet.Back />
        </Sheet.Header>
      </SheetPanelContext>,
    );
    const title = screen.getByRole("heading", { name: "Settings" });
    expect(title.parentElement).toHaveClass("grid", "grid-cols-[1fr_minmax(0,auto)_1fr]");
    expect(title).toHaveAttribute("data-stacksheet-title");
    expect(screen.getByRole("button", { name: "Back" })).toHaveAttribute("data-stacksheet-back");
    expect(screen.getByRole("button", { name: "Close" })).toHaveAttribute("data-stacksheet-close");
  });
});
