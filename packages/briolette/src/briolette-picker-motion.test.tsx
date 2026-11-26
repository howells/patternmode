// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { BriolettePicker } from "./briolette-picker";

const HEX_PATTERN = /^#[0-9a-f]{6}$/u;

const bySlot = (slot: string): Element => {
  const element = document.querySelector(`[data-slot="${slot}"]`);
  if (!element) {
    throw new Error(`expected an element with [data-slot="${slot}"]`);
  }
  return element;
};

describe("BriolettePicker pointer and animation loop", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("captures the pointer on pointerdown, so a drag that leaves the sphere keeps ending cleanly", () => {
    render(<BriolettePicker aria-label="Accent color" onChange={() => {}} value={null} />);

    const sphere = bySlot("briolette-sphere");
    const setPointerCapture = vi.fn<(pointerId: number) => void>();
    Object.defineProperty(sphere, "setPointerCapture", {
      configurable: true,
      value: setPointerCapture,
    });

    fireEvent.pointerDown(sphere, { button: 0, clientX: 40, clientY: 40, pointerId: 2 });

    expect(setPointerCapture).toHaveBeenCalledExactlyOnceWith(2);
  });

  it("selects the facet pressed even when capture retargets the click to the sphere", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    const { container } = render(<BriolettePicker onChange={onChange} value={null} />);
    const sphere = bySlot("briolette-sphere");
    const facet = container.querySelector("polygon[data-face-index]");
    if (!facet) {
      throw new Error("expected a facet polygon");
    }

    fireEvent.pointerDown(facet, { button: 0, buttons: 1, clientX: 40, clientY: 40, pointerId: 1 });
    fireEvent.pointerUp(sphere, { button: 0, buttons: 0, clientX: 41, clientY: 40, pointerId: 1 });
    // With capture the browser dispatches the click on the captured element.
    fireEvent.click(sphere);

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0]?.[0]).toMatch(HEX_PATTERN);
  });

  it("does not select a facet when the press became a drag", () => {
    const onChange = vi.fn<(value: string | null) => void>();
    const { container } = render(<BriolettePicker onChange={onChange} value={null} />);
    const sphere = bySlot("briolette-sphere");
    const facet = container.querySelector("polygon[data-face-index]");
    if (!facet) {
      throw new Error("expected a facet polygon");
    }

    fireEvent.pointerDown(facet, { button: 0, buttons: 1, clientX: 40, clientY: 40, pointerId: 1 });
    fireEvent.pointerMove(sphere, { buttons: 1, clientX: 80, clientY: 40, pointerId: 1 });
    fireEvent.pointerUp(sphere, { button: 0, buttons: 0, clientX: 80, clientY: 40, pointerId: 1 });
    fireEvent.click(sphere);

    expect(onChange).not.toHaveBeenCalled();
  });

  it("stops scheduling animation frames when motion is reduced or a value is settled", () => {
    const raf = vi.fn<(cb: FrameRequestCallback) => number>(() => 1);
    const cancelRaf = vi.fn<(id: number) => void>();
    vi.stubGlobal("requestAnimationFrame", raf);
    vi.stubGlobal("cancelAnimationFrame", cancelRaf);
    vi.stubGlobal("matchMedia", (query: string) => ({
      addEventListener: () => {},
      matches: true,
      media: query,
      removeEventListener: () => {},
    }));

    const { rerender } = render(<BriolettePicker onChange={() => {}} value={null} />);
    expect(raf).not.toHaveBeenCalled();

    vi.stubGlobal("matchMedia", (query: string) => ({
      addEventListener: () => {},
      matches: false,
      media: query,
      removeEventListener: () => {},
    }));
    rerender(<BriolettePicker onChange={() => {}} value="#7a9c8b" />);
    // Only the centering tween wakes rAF; once it finishes, no idle frames remain.
    let now = performance.now();
    let ticks = 0;
    while (raf.mock.calls.length > 0 && ticks < 30) {
      const frameCallback = raf.mock.calls.at(-1)?.[0];
      raf.mockClear();
      now += 64;
      frameCallback?.(now);
      ticks += 1;
    }
    expect(ticks).toBeGreaterThan(0);
    expect(ticks).toBeLessThan(30);
    expect(raf).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("schedules no idle-drift frames in a hidden tab and resumes when it is shown", () => {
    const raf = vi.fn<(cb: FrameRequestCallback) => number>(() => 1);
    vi.stubGlobal("requestAnimationFrame", raf);
    vi.stubGlobal("cancelAnimationFrame", vi.fn<(id: number) => void>());
    vi.stubGlobal("matchMedia", (query: string) => ({
      addEventListener: () => {},
      matches: false,
      media: query,
      removeEventListener: () => {},
    }));
    let hidden = true;
    vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);

    render(<BriolettePicker onChange={() => {}} value={null} />);
    expect(raf).not.toHaveBeenCalled();

    hidden = false;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(raf).toHaveBeenCalledOnce();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("ignores pointer events from a secondary pointer while dragging", () => {
    render(<BriolettePicker onChange={() => {}} value={null} />);
    const sphere = bySlot("briolette-sphere");

    fireEvent.pointerDown(sphere, {
      button: 0,
      buttons: 1,
      clientX: 10,
      clientY: 10,
      pointerId: 1,
    });
    expect(sphere).toHaveAttribute("data-dragging");

    fireEvent.pointerUp(sphere, { button: 0, buttons: 0, clientX: 20, clientY: 20, pointerId: 2 });
    expect(sphere).toHaveAttribute("data-dragging");

    fireEvent.pointerUp(sphere, { button: 0, buttons: 0, clientX: 20, clientY: 20, pointerId: 1 });
    expect(sphere).not.toHaveAttribute("data-dragging");
  });
});
