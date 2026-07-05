// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resolveConfig } from "./config";
import { useBodyScale, useKeyboardInset } from "./renderer-effects";

const mountWrapper = (): HTMLDivElement => {
  const wrapper = document.createElement("div");
  wrapper.dataset.stacksheetWrapper = "";
  document.body.append(wrapper);
  return wrapper;
};

const renderBodyScale = (prefersReducedMotion = false) => {
  const config = resolveConfig({ shouldScaleBackground: true });
  return renderHook(
    ({ isOpen }: { isOpen: boolean }) => {
      useBodyScale(config, isOpen, prefersReducedMotion);
    },
    { initialProps: { isOpen: true } },
  );
};

describe("useBodyScale", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("scales the wrapper while open", () => {
    const wrapper = mountWrapper();
    renderBodyScale();
    expect(wrapper.style.transform).toBe("scale(0.97)");
    expect(wrapper.style.transition).not.toBe("");
    expect(wrapper.style.overflow).toBe("hidden");
  });

  it("animates the un-scale on close instead of snapping back", () => {
    const wrapper = mountWrapper();
    const { rerender } = renderBodyScale();
    rerender({ isOpen: false });
    // Un-scale in flight: transform cleared while the transition is retained
    // so the change animates rather than snapping.
    expect(wrapper.style.transform).toBe("");
    expect(wrapper.style.transition).not.toBe("");
    expect(wrapper.style.overflow).toBe("hidden");
    // Timeout fallback clears the remaining inline styles even if
    // transitionend never fires.
    act(() => {
      vi.advanceTimersByTime(700);
    });
    expect(wrapper.style.transition).toBe("");
    expect(wrapper.style.overflow).toBe("");
    expect(wrapper.style.transformOrigin).toBe("");
  });

  it("clears the remaining styles when the un-scale transition ends", () => {
    const wrapper = mountWrapper();
    const { rerender } = renderBodyScale();
    rerender({ isOpen: false });
    const transitionEnd = new Event("transitionend");
    Object.defineProperty(transitionEnd, "propertyName", { value: "transform" });
    act(() => {
      wrapper.dispatchEvent(transitionEnd);
    });
    expect(wrapper.style.transition).toBe("");
    expect(wrapper.style.overflow).toBe("");
  });

  it("does nothing when reduced motion is preferred", () => {
    const wrapper = mountWrapper();
    renderBodyScale(true);
    expect(wrapper.style.transform).toBe("");
    expect(wrapper.style.transition).toBe("");
  });
});

type ViewportStub = EventTarget & { height: number; offsetTop?: number; scale?: number };

const setVisualViewport = (
  height: number,
  extras: { offsetTop?: number; scale?: number } = {},
): ViewportStub => {
  const viewport: ViewportStub = Object.assign(new EventTarget(), { height, ...extras });
  Object.defineProperty(window, "visualViewport", {
    configurable: true,
    value: viewport,
  });
  return viewport;
};

const focus = (el: HTMLElement) => {
  act(() => {
    el.focus();
    el.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
  });
};

describe("useKeyboardInset", () => {
  let container: HTMLDivElement;
  let field: HTMLInputElement;

  const renderInset = (active = true) => {
    const ref = { current: container };
    return renderHook(({ isActive }: { isActive: boolean }) => useKeyboardInset(isActive, ref), {
      initialProps: { isActive: active },
    });
  };

  beforeEach(() => {
    // Synchronous rAF so the throttle resolves within `act` deterministically.
    vi.stubGlobal("requestAnimationFrame", (paint: FrameRequestCallback) => {
      paint(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 900 });
    container = document.createElement("div");
    field = document.createElement("input");
    container.append(field);
    document.body.append(container);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(window, "visualViewport");
    document.body.innerHTML = "";
  });

  it("reports the keyboard height while an editable field is focused", () => {
    setVisualViewport(600);
    const { result } = renderInset();
    focus(field);
    expect(result.current).toBe(300);
  });

  it("returns 0 when nothing editable is focused, even if the viewport shrank", () => {
    const viewport = setVisualViewport(600);
    const { result } = renderInset();
    act(() => {
      viewport.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toBe(0);
  });

  it("ignores focus on inputs that don't summon a keyboard", () => {
    setVisualViewport(600);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    container.append(checkbox);
    const { result } = renderInset();
    focus(checkbox);
    expect(result.current).toBe(0);
  });

  it("stays at 0 when inactive, even with a focused field and shrunk viewport", () => {
    setVisualViewport(600);
    const { result } = renderInset(false);
    focus(field);
    expect(result.current).toBe(0);
  });

  it("clears back to 0 when the field blurs", () => {
    setVisualViewport(600);
    const { result } = renderInset();
    focus(field);
    expect(result.current).toBe(300);
    act(() => {
      field.blur();
      field.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    });
    expect(result.current).toBe(0);
  });

  it("does not throw when visualViewport is unavailable", () => {
    Reflect.deleteProperty(window, "visualViewport");
    const { result } = renderInset();
    focus(field);
    // Falls back to innerHeight − innerHeight = 0 instead of crashing.
    expect(result.current).toBe(0);
  });

  it("clears a stale inset when reactivated after the keyboard closed", () => {
    setVisualViewport(600);
    const { result, rerender } = renderInset();
    focus(field);
    expect(result.current).toBe(300);
    // Sheet closes while the keyboard is up; state keeps the old 300.
    rerender({ isActive: false });
    act(() => {
      field.blur();
      field.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    });
    // Reopen: the activation measure must reset the stale value.
    rerender({ isActive: true });
    expect(result.current).toBe(0);
  });

  it("ignores editable fields focused outside the container", () => {
    setVisualViewport(600);
    const outside = document.createElement("input");
    document.body.append(outside);
    const { result } = renderInset();
    focus(outside);
    expect(result.current).toBe(0);
  });

  it("subtracts the visual viewport's pan offset from the inset", () => {
    setVisualViewport(600, { offsetTop: 50 });
    const { result } = renderInset();
    focus(field);
    expect(result.current).toBe(250);
  });

  it("treats a pinch-zoomed viewport as no keyboard", () => {
    setVisualViewport(600, { scale: 2 });
    const { result } = renderInset();
    focus(field);
    expect(result.current).toBe(0);
  });
});
