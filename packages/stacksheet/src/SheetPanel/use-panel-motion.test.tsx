// @vitest-environment jsdom
import { setTimeout as sleep } from "node:timers/promises";
import { act, renderHook } from "@testing-library/react";
import { animate } from "motion/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveConfig } from "../config";
import { createStackMotion } from "../stack-motion";
import { usePanelMotion } from "./use-panel-motion";
import type { PanelMotionOptions } from "./use-panel-motion";

// oxlint-disable-next-line anti-slop/no-module-mocking -- the real `animate` runs; the spy only counts how many animations the panel starts.
vi.mock(import("motion/react"), async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, animate: vi.fn<typeof actual.animate>(actual.animate) };
});

/** jsdom has no ResizeObserver; this one lets the test report a resize. */
const stubResizeObserver = () => {
  const observer = { resize: () => {} };
  // A function expression (not an arrow) so `new ResizeObserver()` can construct it.
  const ResizeObserverStub = function ResizeObserverStub(onResize: () => void) {
    observer.resize = onResize;
    return {
      disconnect: vi.fn<() => void>(),
      observe: vi.fn<() => void>(),
      unobserve: vi.fn<() => void>(),
    };
  };
  vi.stubGlobal("ResizeObserver", ResizeObserverStub);
  return observer;
};

/** Longer than either reduced-motion fade (200ms in, 150ms out). */
const FADE_SETTLED_MS = 320;

const renderPanel = (overrides: Partial<PanelMotionOptions> = {}) => {
  const config = resolveConfig();
  const panel = document.createElement("div");
  const safeToRemove = vi.fn<() => void>();
  const base: PanelMotionOptions = {
    dragEnabled: false,
    fitted: false,
    isPresent: true,
    onDismiss: vi.fn<() => void>(),
    onEntered: vi.fn<() => void>(),
    onSnap: vi.fn<(index: number) => void>(),
    panelRef: { current: panel },
    reduced: true,
    rest: 0,
    safeToRemove,
    side: "right",
    snapTravel: () => 0,
    spring: config.spring,
    stack: createStackMotion(),
    stacking: config.stacking,
    ...overrides,
  };
  const hook = renderHook((options: PanelMotionOptions) => usePanelMotion(options), {
    initialProps: base,
  });
  const update = (options: Partial<PanelMotionOptions>) => {
    act(() => {
      hook.rerender({ ...base, ...options });
    });
  };
  const opacity = () => hook.result.current.style.opacity.get();
  return { hook, opacity, panel, safeToRemove, update };
};

describe("usePanelMotion under reduced motion", () => {
  afterEach(() => {
    vi.mocked(animate).mockClear();
  });

  it("fades back in when the Sheet is re-presented mid-exit", async () => {
    const { opacity, safeToRemove, update } = renderPanel();
    await sleep(FADE_SETTLED_MS);
    expect(opacity()).toBe(1);
    update({ isPresent: false });
    await sleep(50);
    expect(opacity()).toBeLessThan(1);
    update({ isPresent: true });
    await sleep(FADE_SETTLED_MS);
    expect(opacity()).toBe(1);
    expect(safeToRemove).not.toHaveBeenCalled();
  });

  it("runs one exit when the rest changes while leaving", async () => {
    const { opacity, safeToRemove, update } = renderPanel();
    await sleep(FADE_SETTLED_MS);
    update({ isPresent: false });
    const startedByExit = vi.mocked(animate).mock.calls.length;
    update({ isPresent: false, rest: 40 });
    expect(animate).toHaveBeenCalledTimes(startedByExit);
    await sleep(FADE_SETTLED_MS);
    expect(opacity()).toBe(0);
    expect(safeToRemove).toHaveBeenCalledOnce();
  });
});

describe("usePanelMotion height changes", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("cancels a fitted Sheet's height change when it starts to leave", () => {
    const observer = stubResizeObserver();
    const heightChange = {
      addEventListener: vi.fn<Animation["addEventListener"]>(),
      cancel: vi.fn<() => void>(),
    };
    const { panel, update } = renderPanel({ fitted: true, reduced: false, side: "bottom" });
    const animatePanel = vi.fn<() => typeof heightChange>(() => heightChange);
    Object.assign(panel, { animate: animatePanel });
    Object.defineProperty(panel, "offsetHeight", { value: 260 });
    observer.resize();
    expect(animatePanel).toHaveBeenCalledOnce();
    update({ fitted: true, isPresent: false, reduced: false, side: "bottom" });
    expect(heightChange.cancel).toHaveBeenCalledOnce();
  });
});
