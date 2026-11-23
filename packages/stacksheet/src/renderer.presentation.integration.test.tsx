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

const FirstSheet = () => <p>First sheet content</p>;
const SecondSheet = () => <p>Second sheet content</p>;
const ThirdSheet = () => <p>Third sheet content</p>;

class MockCloseWatcher {
  static instances: MockCloseWatcher[] = [];
  destroyed = false;
  private readonly listeners = new Set<() => void>();
  constructor() {
    MockCloseWatcher.instances.push(this);
  }
  addEventListener(_type: "close", listener: () => void) {
    this.listeners.add(listener);
  }
  removeEventListener(_type: "close", listener: () => void) {
    this.listeners.delete(listener);
  }
  destroy() {
    this.destroyed = true;
  }
}

const getBackdrop = (): HTMLElement => {
  const backdrop = document.querySelector<HTMLElement>(".patternmode-stacksheet__backdrop");
  if (backdrop === null) {
    throw new Error("No backdrop is rendered");
  }
  return backdrop;
};

const getPanel = (): HTMLElement => {
  const panel = document.querySelector<HTMLElement>("[data-stacksheet-panel]");
  if (panel === null) {
    throw new Error("No panel is rendered");
  }
  return panel;
};

/**
 * Press on the panel and move 40px toward its edge. A dismissal drag takes
 * the pointer once it commits, so `setPointerCapture` says whether one began.
 * jsdom has no PointerEvent; a MouseEvent with the pointer fields stands in.
 */
const dragPanel = (panel: HTMLElement) => {
  const setPointerCapture = vi.fn<(pointerId: number) => void>();
  Object.defineProperty(panel, "setPointerCapture", { value: setPointerCapture });
  const pointer = (type: string, clientX: number) => {
    const event = new MouseEvent(type, { bubbles: true, button: 0, clientX, clientY: 100 });
    Object.defineProperty(event, "pointerId", { value: 7 });
    Object.defineProperty(event, "isPrimary", { value: true });
    Object.defineProperty(event, "pointerType", { value: "mouse" });
    act(() => {
      panel.dispatchEvent(event);
    });
  };
  pointer("pointerdown", 100);
  pointer("pointermove", 140);
  return setPointerCapture;
};

const renderStack = (config?: Parameters<typeof createStacksheet>[0]) => {
  const { StacksheetProvider, store } = createStacksheet(config);
  render(
    <StacksheetProvider>
      <p>App</p>
    </StacksheetProvider>,
  );
  const open = (...args: Parameters<ReturnType<typeof store.getState>["open"]>) => {
    act(() => {
      store.getState().open(...args);
    });
  };
  const push = (...args: Parameters<ReturnType<typeof store.getState>["push"]>) => {
    act(() => {
      store.getState().push(...args);
    });
  };
  const depth = () => store.getState().stack.length;
  return { depth, open, push, store };
};

describe("per-Sheet width", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", () => ({
      addEventListener: vi.fn<MediaQueryList["addEventListener"]>(),
      matches: false,
      removeEventListener: vi.fn<MediaQueryList["removeEventListener"]>(),
    }));
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("sizes each side Sheet to its own width, else the stack's", () => {
    const { open, push } = renderStack();
    open(FirstSheet, {}, { ariaLabel: "Wide", width: 560 });
    expect(screen.getByRole("dialog", { name: "Wide" })).toHaveStyle({ width: "560px" });
    push(SecondSheet, {}, { ariaLabel: "Narrow", width: 400 });
    expect(screen.getByRole("dialog", { name: "Narrow" })).toHaveStyle({ width: "400px" });
    push(ThirdSheet, {}, { ariaLabel: "Default" });
    expect(screen.getByRole("dialog", { name: "Default" })).toHaveStyle({ width: "420px" });
  });
});

describe("per-Sheet dismissible", () => {
  beforeEach(() => {
    MockCloseWatcher.instances = [];
    vi.stubGlobal("CloseWatcher", MockCloseWatcher);
    vi.stubGlobal("matchMedia", () => ({
      addEventListener: vi.fn<MediaQueryList["addEventListener"]>(),
      matches: false,
      removeEventListener: vi.fn<MediaQueryList["removeEventListener"]>(),
    }));
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("ignores Escape and a backdrop click on a non-dismissible Sheet, but close() works", async () => {
    const user = userEvent.setup();
    const { depth, open, store } = renderStack();
    open(FirstSheet, {}, { dismissible: false });
    expect(getBackdrop().style.cursor).not.toBe("pointer");
    await user.keyboard("{Escape}");
    await user.click(getBackdrop());
    expect(depth()).toBe(1);
    act(() => {
      store.getState().close();
    });
    expect(depth()).toBe(0);
  });

  it("dismisses a dismissible Sheet on Escape and on a backdrop click", async () => {
    const user = userEvent.setup();
    const { depth, open } = renderStack();
    open(FirstSheet, {}, { dismissible: true });
    expect(getBackdrop().style.cursor).toBe("pointer");
    await user.keyboard("{Escape}");
    expect(depth()).toBe(0);
    open(FirstSheet, {}, { dismissible: true });
    await user.click(getBackdrop());
    expect(depth()).toBe(0);
  });

  it("lets a Sheet override a stack that is not dismissible", async () => {
    const user = userEvent.setup();
    const { depth, open } = renderStack({ dismissible: false });
    open(FirstSheet, {}, { dismissible: true });
    await user.keyboard("{Escape}");
    expect(depth()).toBe(0);
  });

  it("follows the top Sheet when a dismissible Sheet is pushed over a non-dismissible one", async () => {
    const user = userEvent.setup();
    const { depth, open, push } = renderStack();
    open(FirstSheet, {}, { dismissible: false });
    push(SecondSheet, {}, { dismissible: true });
    await user.keyboard("{Escape}");
    expect(depth()).toBe(1);
    // Back on the non-dismissible Sheet, Escape does nothing.
    await user.keyboard("{Escape}");
    expect(depth()).toBe(1);
  });

  it("follows the top Sheet when a non-dismissible Sheet is pushed over a dismissible one", async () => {
    const user = userEvent.setup();
    const { depth, open, push, store } = renderStack();
    open(FirstSheet, {});
    push(SecondSheet, {}, { dismissible: false });
    await user.keyboard("{Escape}");
    await user.click(getBackdrop());
    expect(depth()).toBe(2);
    act(() => {
      store.getState().pop();
    });
    await user.keyboard("{Escape}");
    expect(depth()).toBe(0);
  });

  it("starts a dismissal drag on a dismissible Sheet", () => {
    const { open } = renderStack({ dismissible: false });
    open(FirstSheet, {}, { dismissible: true });
    expect(dragPanel(getPanel())).toHaveBeenCalledOnce();
  });

  it("does not start a dismissal drag on a non-dismissible Sheet", () => {
    const { open } = renderStack();
    open(FirstSheet, {}, { dismissible: false });
    expect(dragPanel(getPanel())).not.toHaveBeenCalled();
  });

  it("holds a CloseWatcher only while the top Sheet is dismissible", () => {
    const { open, push } = renderStack();
    const live = () => MockCloseWatcher.instances.filter((watcher) => !watcher.destroyed).length;
    open(FirstSheet, {}, { dismissible: false });
    expect(live()).toBe(0);
    push(SecondSheet, {}, { dismissible: true });
    expect(live()).toBe(1);
  });
});
