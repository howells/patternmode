// @vitest-environment jsdom

import { setTimeout as sleep } from "node:timers/promises";
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Profiler } from "react";
import type { ProfilerOnRenderCallback } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ScrollFrame } from "./index";

class ResizeObserverMock {
  observe = vi.fn<(target: Element) => void>();
  disconnect = vi.fn<() => void>();
  unobserve = vi.fn<(target: Element) => void>();
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
  // jsdom implements no Web Animations API, and base-ui's scroll area calls
  // `getAnimations()` from a timer of its own. Any test that waits long enough
  // for that timer to fire hits it, which has nothing to do with the frame.
  if (typeof Element.prototype.getAnimations !== "function") {
    Element.prototype.getAnimations = () => [];
  }
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ScrollFrame", () => {
  it("renders a named Radix-backed scroll region with fades and plumbing", () => {
    render(
      <ScrollFrame aria-label="Updates">
        <p>One</p>
        <p>Two</p>
      </ScrollFrame>,
    );

    const region = screen.getByRole("region", { name: "Updates" });
    expect(region).toHaveClass("patternmode-scrollframe");
    expect(region).toHaveAttribute("data-axes", "vertical");
    expect(region).toHaveAttribute("data-axis-vertical", "true");
    expect(region).toHaveAttribute("data-slot", "scrollframe");

    const viewport = screen.getByTestId("scrollframe-viewport");
    expect(viewport).toHaveAttribute("data-slot", "scrollframe-viewport");
    expect(screen.getByTestId("scrollframe-fade-vertical-start")).toBeInTheDocument();
    expect(screen.getByTestId("scrollframe-fade-vertical-end")).toBeInTheDocument();
  });

  it("masks the viewport instead of painting fades in mask fade mode", () => {
    render(
      <ScrollFrame aria-label="Frosted" fadeMode="mask">
        <p>One</p>
        <p>Two</p>
      </ScrollFrame>,
    );

    const viewport = screen.getByTestId("scrollframe-viewport");
    expect(viewport).toHaveAttribute("data-fade-mode", "mask");
    expect(screen.queryByTestId("scrollframe-fade-vertical-start")).not.toBeInTheDocument();
    expect(screen.queryByTestId("scrollframe-fade-vertical-end")).not.toBeInTheDocument();

    // Unmeasured content is not scrollable, so every ramp starts collapsed.
    expect(viewport.style.getPropertyValue("--patternmode-scrollframe-mask-top")).toBe("0px");
    expect(viewport.style.getPropertyValue("--patternmode-scrollframe-mask-bottom")).toBe("0px");
  });

  it("collapses mask ramps at the measured scroll edges", () => {
    render(
      <ScrollFrame aria-label="Masked" fadeMode="mask">
        <div>Content</div>
      </ScrollFrame>,
    );

    const viewport = screen.getByTestId("scrollframe-viewport");
    Object.defineProperties(viewport, {
      clientHeight: { configurable: true, value: 100 },
      scrollHeight: { configurable: true, value: 300 },
      scrollTop: { configurable: true, value: 0, writable: true },
    });

    const ramp = (edge: "top" | "bottom") =>
      viewport.style.getPropertyValue(`--patternmode-scrollframe-mask-${edge}`);

    act(() => {
      fireEvent.scroll(viewport);
    });

    // At the start: nothing behind the top edge, content beyond the bottom.
    expect(ramp("top")).toBe("0px");
    expect(ramp("bottom")).toBe("var(--patternmode-scrollframe-fade-size)");

    viewport.scrollTop = 100;
    act(() => {
      fireEvent.scroll(viewport);
    });
    expect(ramp("top")).toBe("var(--patternmode-scrollframe-fade-size)");
    expect(ramp("bottom")).toBe("var(--patternmode-scrollframe-fade-size)");

    viewport.scrollTop = 200;
    act(() => {
      fireEvent.scroll(viewport);
    });
    expect(ramp("top")).toBe("var(--patternmode-scrollframe-fade-size)");
    expect(ramp("bottom")).toBe("0px");
  });

  it("keeps excluded edges collapsed when mask fades are limited", () => {
    render(
      <ScrollFrame aria-label="End only" fadeMode="mask" fades="end">
        <div>Content</div>
      </ScrollFrame>,
    );

    const viewport = screen.getByTestId("scrollframe-viewport");
    Object.defineProperties(viewport, {
      clientHeight: { configurable: true, value: 100 },
      scrollHeight: { configurable: true, value: 300 },
      scrollTop: { configurable: true, value: 100, writable: true },
    });

    act(() => {
      fireEvent.scroll(viewport);
    });

    // Mid-scroll with both edges reachable, but only the end edge is enabled.
    expect(viewport.style.getPropertyValue("--patternmode-scrollframe-mask-top")).toBe("0px");
    expect(viewport.style.getPropertyValue("--patternmode-scrollframe-mask-bottom")).toBe(
      "var(--patternmode-scrollframe-fade-size)",
    );
  });

  it("does not commit further updates when a measurement reports unchanged metrics", () => {
    const onRender = vi.fn<ProfilerOnRenderCallback>();

    render(
      <Profiler id="scrollframe" onRender={onRender}>
        <ScrollFrame aria-label="Stable" axes="horizontal" scrollbars="hidden">
          <span>Item</span>
        </ScrollFrame>
      </Profiler>,
    );

    // The viewport reports the same (zero) geometry on every measurement, so a
    // burst of measurements — here via scroll events, the same `measure` path
    // the ResizeObserver uses — must not commit any further updates. Before the
    // fix each measurement allocated a fresh edge-state object, so every one
    // forced a commit; in a real browser that commit's layout change re-fired
    // the observer, looping unbounded at 100% CPU.
    const viewport = screen.getByTestId("scrollframe-viewport");

    // Base UI's ScrollArea flips its own `data-scrolling` state on the first
    // scroll (one bounded commit); warm past it so the assertion measures only
    // ScrollFrame's measurement guard, not Base UI's scroll-state toggle.
    act(() => {
      fireEvent.scroll(viewport);
    });
    const settledCommits = onRender.mock.calls.length;

    for (let i = 0; i < 20; i += 1) {
      act(() => {
        fireEvent.scroll(viewport);
      });
    }

    expect(onRender.mock.calls.length).toBe(settledCommits);
  });

  it("supports both axes and keeps hidden scrollbar plumbing mounted", () => {
    render(
      <ScrollFrame axes="both" scrollbars="hidden">
        <div>Content</div>
      </ScrollFrame>,
    );

    const root = screen.getByTestId("scrollframe-viewport").parentElement;
    expect(root).toHaveAttribute("data-axes", "both");
    expect(root).toHaveAttribute("data-scrollbar-visibility", "hidden");
    expect(root?.querySelectorAll('[data-slot="scrollframe-scrollbar"]')).toHaveLength(2);
    // Hidden mode flags the scrollbar so CSS collapses it while the plumbing
    // (and its measurement) stays mounted.
    for (const scrollbar of root?.querySelectorAll('[data-slot="scrollframe-scrollbar"]') ?? []) {
      expect(scrollbar).toHaveAttribute("data-hidden", "true");
    }
  });

  it("reflects the scrollbars mode on the root and keeps `always` plumbing mounted", () => {
    const { rerender } = render(
      <ScrollFrame axes="both" scrollbars="always">
        <div>Content</div>
      </ScrollFrame>,
    );

    let root = screen.getByTestId("scrollframe-viewport").parentElement;
    expect(root).toHaveAttribute("data-scrollbar-visibility", "always");
    // `always` keeps both scrollbars mounted regardless of overflow, and does
    // not flag them hidden.
    const alwaysScrollbars = root?.querySelectorAll('[data-slot="scrollframe-scrollbar"]');
    expect(alwaysScrollbars).toHaveLength(2);
    expect(alwaysScrollbars?.[0]).not.toHaveAttribute("data-hidden");

    for (const mode of ["auto", "hover"] as const) {
      rerender(
        <ScrollFrame axes="both" scrollbars={mode}>
          <div>Content</div>
        </ScrollFrame>,
      );
      root = screen.getByTestId("scrollframe-viewport").parentElement;
      expect(root).toHaveAttribute("data-scrollbar-visibility", mode);
    }
  });

  it("updates edge state and moves by a page step", () => {
    const scrollBy = vi.fn<(options: ScrollToOptions) => void>();

    render(
      <ScrollFrame
        aria-label="Scrollable"
        controls={{ visibility: "disabled" }}
        scrollBehavior="auto"
      >
        <div>Content</div>
      </ScrollFrame>,
    );

    const viewport = screen.getByTestId("scrollframe-viewport");
    const root = screen.getByRole("region", { name: "Scrollable" });
    Object.defineProperties(viewport, {
      clientHeight: { configurable: true, value: 100 },
      scrollBy: { configurable: true, value: scrollBy },
      scrollHeight: { configurable: true, value: 300 },
      scrollTop: { configurable: true, value: 0, writable: true },
    });

    act(() => {
      fireEvent.scroll(viewport);
    });

    expect(root).toHaveAttribute("data-axes", "vertical");
    const previous = screen.getByRole("button", { name: "Scroll backward" });
    const next = screen.getByRole("button", { name: "Scroll forward" });
    expect(previous).toBeDisabled();
    expect(next).not.toBeDisabled();

    fireEvent.click(next);

    expect(scrollBy).toHaveBeenCalledWith({ behavior: "auto", top: 85 });
  });

  it("optionally drag-scrolls native scroll while preserving selection until the drag threshold", () => {
    render(
      <ScrollFrame
        aria-label="Materials"
        axes="horizontal"
        dragScroll={{ activationDistance: 8 }}
        scrollbars="hidden"
      >
        <span>Granite</span>
        <span>Basalt</span>
      </ScrollFrame>,
    );

    const root = screen.getByRole("region", { name: "Materials" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 40, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(content, { button: 0, clientX: 0, pointerId: 1 });
      fireEvent.pointerMove(content, { clientX: -4, pointerId: 1 });
    });

    expect(root).toHaveAttribute("data-drag-scroll", "true");
    expect(root).not.toHaveAttribute("data-dragging", "true");
    expect(viewport.scrollLeft).toBe(40);

    act(() => {
      fireEvent.pointerMove(content, { clientX: -12, pointerId: 1 });
    });

    expect(root).toHaveAttribute("data-dragging", "true");
    expect(viewport.scrollLeft).toBe(52);

    act(() => {
      fireEvent.pointerUp(content, { pointerId: 1 });
    });

    expect(root).not.toHaveAttribute("data-dragging", "true");
  });

  it("allows chip buttons to start drag scroll and suppresses the resulting click", () => {
    const handleClick = vi.fn<() => void>();

    render(
      <ScrollFrame aria-label="Materials" axes="horizontal" dragScroll>
        <button onClick={handleClick} type="button">
          Granite
        </button>
        <button type="button">Basalt</button>
      </ScrollFrame>,
    );

    const root = screen.getByRole("region", { name: "Materials" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    const button = screen.getByRole("button", { name: "Granite" });
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 20, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(button, { button: 0, clientX: 0, pointerId: 1 });
      fireEvent.pointerMove(content, { clientX: -20, pointerId: 1 });
    });

    expect(root).toHaveAttribute("data-dragging", "true");
    expect(viewport.scrollLeft).toBe(40);

    act(() => {
      fireEvent.pointerUp(content, { pointerId: 1 });
      fireEvent.click(button);
    });

    expect(handleClick).not.toHaveBeenCalled();
    expect(root).not.toHaveAttribute("data-dragging", "true");
  });

  it("preserves chip button clicks when pointer movement stays below the drag threshold", () => {
    const handleClick = vi.fn<() => void>();

    render(
      <ScrollFrame aria-label="Materials" axes="horizontal" dragScroll={{ activationDistance: 8 }}>
        <button onClick={handleClick} type="button">
          Granite
        </button>
        <button type="button">Basalt</button>
      </ScrollFrame>,
    );

    const root = screen.getByRole("region", { name: "Materials" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    const button = screen.getByRole("button", { name: "Granite" });
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 20, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(button, { button: 0, clientX: 0, pointerId: 1 });
      fireEvent.pointerMove(content, { clientX: -4, pointerId: 1 });
      fireEvent.pointerUp(content, { pointerId: 1 });
      fireEvent.click(button);
    });

    expect(root).not.toHaveAttribute("data-dragging", "true");
    expect(viewport.scrollLeft).toBe(20);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("never captures the pointer, so plain clicks still activate links inside the frame", () => {
    // Capturing retargets the gesture — including the compatibility `mouseup`
    // and `click` — at the capturing element. A click delivered to the scroll
    // container never activates the element under the cursor, so every link in
    // a drag-scrollable frame went dead: press, release, nothing, with nothing
    // thrown and nothing prevented. The old unit tests missed it because they
    // dispatch `click` at the target directly, which is exactly what the
    // browser stops doing under capture.
    render(
      <ScrollFrame aria-label="Winners" axes="horizontal" dragScroll={{ activationDistance: 8 }}>
        <a href="/projects/one">One</a>
      </ScrollFrame>,
    );

    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    const link = screen.getByRole("link", { name: "One" });
    const setPointerCapture = vi.fn<(pointerId: number) => void>();
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 0, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });
    Object.defineProperties(content, {
      setPointerCapture: { configurable: true, value: setPointerCapture },
    });

    act(() => {
      fireEvent.pointerDown(link, { button: 0, clientX: 0, pointerId: 1 });
      fireEvent(window, new PointerEvent("pointermove", { clientX: -40, pointerId: 1 }));
      fireEvent(window, new PointerEvent("pointerup", { pointerId: 1 }));
    });

    expect(setPointerCapture).not.toHaveBeenCalled();
  });

  it("commits a drag from moves that land outside the frame", () => {
    // The deciding move of a drag begun near the edge lands outside the
    // element, so an element-bound move handler never sees it and the drag
    // never starts. Window-level tracking is what makes edge drags possible
    // without reaching for pointer capture.
    render(
      <ScrollFrame aria-label="Winners" axes="horizontal" dragScroll={{ activationDistance: 8 }}>
        <a href="/projects/one">One</a>
      </ScrollFrame>,
    );

    const root = screen.getByRole("region", { name: "Winners" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const link = screen.getByRole("link", { name: "One" });
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 120, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(link, { button: 0, clientX: 0, pointerId: 1 });
      // Never touches the frame again — every move is on window.
      fireEvent(window, new PointerEvent("pointermove", { clientX: -60, pointerId: 1 }));
    });

    expect(root).toHaveAttribute("data-dragging", "true");
    expect(viewport.scrollLeft).toBe(180);
  });

  it("stops suppressing clicks once the gesture is over", async () => {
    // The flag used to be cleared only by a click arriving. A drag that ended
    // without producing one left it set, and the next unrelated click anywhere
    // in the frame was swallowed.
    const handleClick = vi.fn<() => void>();
    render(
      <ScrollFrame aria-label="Winners" axes="horizontal" dragScroll={{ activationDistance: 8 }}>
        <button onClick={handleClick} type="button">
          One
        </button>
      </ScrollFrame>,
    );

    const viewport = screen.getByTestId("scrollframe-viewport");
    const button = screen.getByRole("button", { name: "One" });
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 120, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(button, { button: 0, clientX: 0, pointerId: 1 });
      fireEvent(window, new PointerEvent("pointermove", { clientX: -60, pointerId: 1 }));
      fireEvent(window, new PointerEvent("pointerup", { pointerId: 1 }));
      // The drag produced no click at all.
    });
    // Let the macrotask that clears the suppression flag run.
    await act(async () => {
      await sleep(0);
    });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not start drag scroll from form controls or explicitly ignored content", () => {
    render(
      <ScrollFrame aria-label="Actions" axes="horizontal" dragScroll>
        <input aria-label="Search" />
        <span data-scrollframe-no-drag="">Selectable label</span>
      </ScrollFrame>,
    );

    const root = screen.getByRole("region", { name: "Actions" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    const input = screen.getByRole("textbox", { name: "Search" });
    const ignored = screen.getByText("Selectable label");
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollLeft: { configurable: true, value: 20, writable: true },
      scrollWidth: { configurable: true, value: 300 },
    });

    act(() => {
      fireEvent.pointerDown(input, { button: 0, clientX: 0, pointerId: 1 });
      fireEvent.pointerMove(content, { clientX: -20, pointerId: 1 });
    });

    expect(root).not.toHaveAttribute("data-dragging", "true");
    expect(viewport.scrollLeft).toBe(20);

    act(() => {
      fireEvent.pointerDown(ignored, { button: 0, clientX: 0, pointerId: 2 });
      fireEvent.pointerMove(content, { clientX: -20, pointerId: 2 });
    });

    expect(root).not.toHaveAttribute("data-dragging", "true");
    expect(viewport.scrollLeft).toBe(20);
  });
});
