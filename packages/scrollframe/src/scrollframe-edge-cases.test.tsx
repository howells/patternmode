// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ScrollFrame } from "./index";
import { getAxisState } from "./ScrollFrame/scroll-frame-utils";

const observedTargets: Element[] = [];

class TrackingResizeObserver {
  disconnect = vi.fn<() => void>();
  observe = vi.fn<(target: Element) => void>((target) => {
    observedTargets.push(target);
  });
  unobserve = vi.fn<(target: Element) => void>();
}

const bySlot = (slot: string): HTMLElement => {
  const element = document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
  if (!element) {
    throw new Error(`expected an element with [data-slot="${slot}"]`);
  }
  return element;
};

describe("ScrollFrame edge cases", () => {
  beforeEach(() => {
    observedTargets.length = 0;
    vi.stubGlobal("ResizeObserver", TrackingResizeObserver);
    if (!("getAnimations" in Element.prototype)) {
      Element.prototype.getAnimations = () => [];
    }
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("observes both the viewport and its content wrapper for size changes", () => {
    render(
      <ScrollFrame aria-label="Dynamic list">
        <div>Row</div>
      </ScrollFrame>,
    );

    const viewport = bySlot("scrollframe-viewport");
    const content = bySlot("scrollframe-content");
    expect(observedTargets).toContain(viewport);
    expect(observedTargets).toContain(content);
  });

  it("ignores pointerup from a secondary pointer during an active drag", () => {
    render(
      <ScrollFrame aria-label="Strip" axes="horizontal" dragScroll={{ activationDistance: 8 }}>
        <span>One</span>
      </ScrollFrame>,
    );

    const root = screen.getByRole("region", { name: "Strip" });
    const viewport = bySlot("scrollframe-viewport");
    const content = bySlot("scrollframe-content");
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 40, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(content, { button: 0, clientX: 0, pointerId: 1 });
      fireEvent(window, new PointerEvent("pointermove", { clientX: -20, pointerId: 1 }));
    });
    expect(root).toHaveAttribute("data-dragging", "true");

    act(() => {
      fireEvent(window, new PointerEvent("pointerup", { pointerId: 2 }));
    });
    expect(root).toHaveAttribute("data-dragging", "true");

    act(() => {
      fireEvent(window, new PointerEvent("pointerup", { pointerId: 1 }));
    });
    expect(root).not.toHaveAttribute("data-dragging", "true");
  });

  it("clears the page selection once per pointer move", () => {
    const removeAllRanges = vi.spyOn(Selection.prototype, "removeAllRanges");
    render(
      <ScrollFrame aria-label="Strip" axes="horizontal" dragScroll={{ activationDistance: 8 }}>
        <span>One</span>
      </ScrollFrame>,
    );
    const viewport = bySlot("scrollframe-viewport");
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 40, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(bySlot("scrollframe-content"), { button: 0, clientX: 0, pointerId: 1 });
    });
    removeAllRanges.mockClear();
    act(() => {
      fireEvent(
        bySlot("scrollframe-content"),
        new PointerEvent("pointermove", { bubbles: true, clientX: -20, pointerId: 1 }),
      );
    });

    expect(removeAllRanges).toHaveBeenCalledOnce();
  });

  it("does not let a stale suppression timer clear a later drag's click suppression", () => {
    vi.useFakeTimers();
    try {
      const onClick = vi.fn<() => void>();
      render(
        <ScrollFrame aria-label="Strip" axes="horizontal" dragScroll={{ activationDistance: 8 }}>
          <button onClick={onClick} type="button">
            Item
          </button>
        </ScrollFrame>,
      );
      const viewport = bySlot("scrollframe-viewport");
      const content = bySlot("scrollframe-content");
      Object.defineProperties(viewport, {
        clientWidth: { configurable: true, value: 100 },
        scrollLeft: { configurable: true, value: 40, writable: true },
        scrollWidth: { configurable: true, value: 300 },
      });
      const drag = (pointerId: number) => {
        fireEvent.pointerDown(content, { button: 0, clientX: 0, pointerId });
        fireEvent(window, new PointerEvent("pointermove", { clientX: -20, pointerId }));
      };

      act(() => {
        drag(1);
        fireEvent(window, new PointerEvent("pointerup", { pointerId: 1 }));
        drag(2);
        vi.advanceTimersByTime(1);
      });
      fireEvent.click(screen.getByRole("button", { name: "Item" }));

      expect(onClick).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it("keeps ref callbacks attached across re-renders", () => {
    const viewportRef = vi.fn<(node: HTMLDivElement | null) => void>();
    const view = render(
      <ScrollFrame aria-label="Stable" viewportRef={viewportRef}>
        <div>Row</div>
      </ScrollFrame>,
    );
    view.rerender(
      <ScrollFrame aria-label="Stable" viewportRef={viewportRef}>
        <div>Row</div>
        <div>Another</div>
      </ScrollFrame>,
    );

    expect(viewportRef).toHaveBeenCalledExactlyOnceWith(bySlot("scrollframe-viewport"));
  });

  it("resolves horizontal edge state accurately for negative RTL scrollLeft offsets", () => {
    const node = document.createElement("div");
    node.style.direction = "rtl";
    document.body.append(node);
    Object.defineProperties(node, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 0, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    expect(getAxisState(node, "horizontal")).toStrictEqual({
      atEnd: false,
      atStart: true,
      scrollable: true,
    });

    node.scrollLeft = -100;
    expect(getAxisState(node, "horizontal")).toStrictEqual({
      atEnd: false,
      atStart: false,
      scrollable: true,
    });

    node.scrollLeft = -200;
    expect(getAxisState(node, "horizontal")).toStrictEqual({
      atEnd: true,
      atStart: false,
      scrollable: true,
    });
  });
});
