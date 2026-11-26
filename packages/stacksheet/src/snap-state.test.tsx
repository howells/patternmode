// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { resolveConfig } from "./config";
import { useSnapState } from "./snap-state";
import type { SheetItem } from "./types";

const stack: SheetItem[] = [{ data: {}, id: "a", type: "a" }];

const renderSnapState = (snapPointIndex?: number) => {
  const onSnapPointChange = vi.fn<(index: number) => void>();
  const config = resolveConfig({ onSnapPointChange, snapPointIndex, snapPoints: [100, 200, 300] });
  const hook = renderHook(() => useSnapState(config, true, "bottom", stack));
  return { hook, onSnapPointChange };
};

describe(useSnapState, () => {
  it("opens on the tallest Snap Point by default", () => {
    const { hook } = renderSnapState();
    expect(hook.result.current.activeSnapIndex).toBe(2);
  });

  it("opens on the configured snapPointIndex", () => {
    const { hook } = renderSnapState(0);
    expect(hook.result.current.activeSnapIndex).toBe(0);
  });

  it("follows a drag away from the configured snapPointIndex", () => {
    const { hook, onSnapPointChange } = renderSnapState(0);
    act(() => {
      hook.result.current.handleSnap(2);
    });
    expect(hook.result.current.activeSnapIndex).toBe(2);
    expect(onSnapPointChange).toHaveBeenCalledWith(2);
  });
});
