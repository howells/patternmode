// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

import type { DragConfig, DragState } from "./drag-types";
import { useDrag } from "./use-drag";

const buildConfig = (overrides: Partial<DragConfig> = {}): DragConfig => ({
  activeSnapIndex: 0,
  closeThreshold: 0.25,
  enabled: true,
  isNested: false,
  onClose: vi.fn<() => void>(),
  onPop: vi.fn<() => void>(),
  onSnap: vi.fn<(index: number) => void>(),
  sequential: false,
  side: "right",
  snapHeights: [],
  velocityThreshold: 0.5,
  ...overrides,
});

interface Harness {
  onDragUpdate: Mock<(state: DragState) => void>;
  panel: HTMLDivElement;
  pointerEvent: (type: string, x: number, y: number) => void;
  setPointerCapture: Mock<(pointerId: number) => void>;
}

const setupDragPanel = (config: DragConfig): Harness => {
  const panel = document.createElement("div");
  document.body.append(panel);
  Object.defineProperty(panel, "offsetWidth", { value: 400 });
  Object.defineProperty(panel, "offsetHeight", { value: 600 });
  const setPointerCapture = vi.fn<(pointerId: number) => void>();
  Object.defineProperty(panel, "setPointerCapture", { value: setPointerCapture });
  const panelRef = { current: panel };
  const onDragUpdate = vi.fn<(state: DragState) => void>();
  renderHook(() => {
    useDrag(panelRef, config, onDragUpdate);
  });
  const pointerEvent = (type: string, x: number, y: number) => {
    const event = new MouseEvent(type, {
      bubbles: true,
      button: 0,
      cancelable: true,
      clientX: x,
      clientY: y,
    });
    Object.defineProperty(event, "pointerId", { value: 7 });
    panel.dispatchEvent(event);
  };
  return { onDragUpdate, panel, pointerEvent, setPointerCapture };
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("useDrag pointer capture", () => {
  it("does not capture the pointer on pointerdown, so plain taps keep their clicks", () => {
    const config = buildConfig();
    const { pointerEvent, setPointerCapture } = setupDragPanel(config);
    pointerEvent("pointerdown", 100, 100);
    expect(setPointerCapture).not.toHaveBeenCalled();
    pointerEvent("pointerup", 100, 100);
    expect(setPointerCapture).not.toHaveBeenCalled();
    expect(config.onClose).not.toHaveBeenCalled();
    expect(config.onPop).not.toHaveBeenCalled();
  });

  it("does not capture the pointer for movement inside the dead zone", () => {
    const { onDragUpdate, pointerEvent, setPointerCapture } = setupDragPanel(buildConfig());
    pointerEvent("pointerdown", 100, 100);
    pointerEvent("pointermove", 104, 100);
    expect(setPointerCapture).not.toHaveBeenCalled();
    expect(onDragUpdate).not.toHaveBeenCalled();
  });

  it("captures the pointer once the gesture commits as a drag", () => {
    const { onDragUpdate, pointerEvent, setPointerCapture } = setupDragPanel(buildConfig());
    pointerEvent("pointerdown", 100, 100);
    pointerEvent("pointermove", 130, 100);
    expect(setPointerCapture).toHaveBeenCalledTimes(1);
    expect(setPointerCapture).toHaveBeenCalledWith(7);
    expect(onDragUpdate).toHaveBeenCalledWith({ isDragging: true, offset: 30 });
    pointerEvent("pointermove", 160, 100);
    expect(setPointerCapture).toHaveBeenCalledTimes(1);
  });

  it("does not capture the pointer for an off-axis gesture", () => {
    const { onDragUpdate, pointerEvent, setPointerCapture } = setupDragPanel(buildConfig());
    pointerEvent("pointerdown", 100, 100);
    pointerEvent("pointermove", 100, 140);
    expect(setPointerCapture).not.toHaveBeenCalled();
    expect(onDragUpdate).not.toHaveBeenCalled();
  });

  it("dismisses when a committed drag is released past the close threshold", () => {
    const config = buildConfig();
    const { pointerEvent } = setupDragPanel(config);
    pointerEvent("pointerdown", 100, 100);
    pointerEvent("pointermove", 130, 100);
    pointerEvent("pointermove", 250, 100);
    pointerEvent("pointerup", 250, 100);
    expect(config.onClose).toHaveBeenCalledTimes(1);
  });
});
