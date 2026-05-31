// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ScrollFrame } from "./index";

class ResizeObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
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
      </ScrollFrame>
    );

    const region = screen.getByRole("region", { name: "Updates" });
    expect(region).toHaveClass("patternmode-scrollframe");
    expect(region).toHaveAttribute("data-axes", "vertical");
    expect(region).toHaveAttribute("data-axis-vertical", "true");
    expect(region).toHaveAttribute("data-slot", "scrollframe");

    const viewport = screen.getByTestId("scrollframe-viewport");
    expect(viewport).toHaveAttribute("data-slot", "scrollframe-viewport");
    expect(
      screen.getByTestId("scrollframe-fade-vertical-start")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("scrollframe-fade-vertical-end")
    ).toBeInTheDocument();
  });

  it("supports both axes and keeps hidden scrollbar plumbing mounted", () => {
    render(
      <ScrollFrame axes="both" scrollbars="hidden">
        <div>Content</div>
      </ScrollFrame>
    );

    const root = screen.getByTestId("scrollframe-viewport").parentElement;
    expect(root).toHaveAttribute("data-axes", "both");
    expect(root).toHaveAttribute("data-scrollbar-visibility", "hidden");
    expect(
      root?.querySelectorAll('[data-slot="scrollframe-scrollbar"]')
    ).toHaveLength(2);
  });

  it("updates edge state and moves by a page step", () => {
    const scrollBy = vi.fn();

    render(
      <ScrollFrame
        aria-label="Scrollable"
        controls={{ visibility: "disabled" }}
        scrollBehavior="auto"
      >
        <div>Content</div>
      </ScrollFrame>
    );

    const viewport = screen.getByTestId("scrollframe-viewport");
    const root = screen.getByRole("region", { name: "Scrollable" });
    Object.defineProperties(viewport, {
      clientHeight: { configurable: true, value: 100 },
      scrollHeight: { configurable: true, value: 300 },
      scrollTop: { configurable: true, value: 0, writable: true },
      scrollBy: { configurable: true, value: scrollBy },
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

    expect(scrollBy).toHaveBeenCalledWith({ top: 85, behavior: "auto" });
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
      </ScrollFrame>
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
    const handleClick = vi.fn();

    render(
      <ScrollFrame aria-label="Materials" axes="horizontal" dragScroll>
        <button onClick={handleClick} type="button">
          Granite
        </button>
        <button type="button">Basalt</button>
      </ScrollFrame>
    );

    const root = screen.getByRole("region", { name: "Materials" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    const button = screen.getByRole("button", { name: "Granite" });
    Object.defineProperties(viewport, {
      scrollLeft: { configurable: true, value: 20, writable: true },
      scrollWidth: { configurable: true, value: 300 },
      clientWidth: { configurable: true, value: 100 },
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
    const handleClick = vi.fn();

    render(
      <ScrollFrame
        aria-label="Materials"
        axes="horizontal"
        dragScroll={{ activationDistance: 8 }}
      >
        <button onClick={handleClick} type="button">
          Granite
        </button>
        <button type="button">Basalt</button>
      </ScrollFrame>
    );

    const root = screen.getByRole("region", { name: "Materials" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    const button = screen.getByRole("button", { name: "Granite" });
    Object.defineProperties(viewport, {
      scrollLeft: { configurable: true, value: 20, writable: true },
      scrollWidth: { configurable: true, value: 300 },
      clientWidth: { configurable: true, value: 100 },
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

  it("does not start drag scroll from form controls or explicitly ignored content", () => {
    render(
      <ScrollFrame aria-label="Actions" axes="horizontal" dragScroll>
        <input aria-label="Search" />
        <span data-scrollframe-no-drag="">Selectable label</span>
      </ScrollFrame>
    );

    const root = screen.getByRole("region", { name: "Actions" });
    const viewport = screen.getByTestId("scrollframe-viewport");
    const content = screen.getByTestId("scrollframe-content");
    const input = screen.getByRole("textbox", { name: "Search" });
    const ignored = screen.getByText("Selectable label");
    Object.defineProperties(viewport, {
      scrollLeft: { configurable: true, value: 20, writable: true },
      scrollWidth: { configurable: true, value: 300 },
      clientWidth: { configurable: true, value: 100 },
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
