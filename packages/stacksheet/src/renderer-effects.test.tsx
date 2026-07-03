// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resolveConfig } from "./config";
import { useBodyScale } from "./renderer-effects";

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
