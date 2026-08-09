// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getHaloGeometry,
  getHaloHueHandlePosition,
  getHaloPadHandlePosition,
  HaloPicker,
  haloAngleToHue,
  hslToHex,
  hueToHaloAngle,
  pointerToHaloHue,
  pointerToHaloPad,
} from "./index";
import type { HaloColor } from "./index";

afterEach(() => {
  cleanup();
});

const value = { h: 16, l: 69, s: 48 };

describe("HaloPicker utilities", () => {
  it("converts HSL values to clamped hex colors", () => {
    expect(hslToHex(16, 48, 69)).toBe("#d69e8a");
    expect(hslToHex(720, 200, -20)).toBe("#000000");
  });

  it("maps saturation/lightness and hue to stable handle coordinates", () => {
    expect(getHaloPadHandlePosition(50, 50)).toEqual({ x: 52, y: 52 });
    const hueHandle = getHaloHueHandlePosition(0);
    expect(typeof hueHandle.x).toBe("number");
    expect(typeof hueHandle.y).toBe("number");
  });

  it("converts pointer positions into bounded color channels", () => {
    const padRect = new DOMRect(10, 20, 104, 104);
    expect(pointerToHaloPad(62, 72, padRect)).toEqual({ l: 50, s: 50 });

    const svgRect = new DOMRect(0, 0, 128, 128);
    expect(pointerToHaloHue(128, 78, svgRect)).toBeGreaterThan(0);
  });

  it("rotates the arc geometry per placement", () => {
    expect(getHaloGeometry("bottom").arcStartDeg).toBe(10);
    expect(getHaloGeometry("top").arcStartDeg).toBe(190);
    expect(getHaloGeometry("left").arcStartDeg).toBe(100);
    expect(getHaloGeometry("right").arcStartDeg).toBe(280);

    /* Top/bottom share one stage box; left/right are its transpose. */
    const bottom = getHaloGeometry("bottom");
    const left = getHaloGeometry("left");
    expect([left.width, left.height]).toEqual([bottom.height, bottom.width]);

    expect(hueToHaloAngle(0, "top")).toBe(190);
    expect(hueToHaloAngle(360, "top")).toBe(190);
    /* The right placement's span crosses 0° and must read continuously. */
    expect(haloAngleToHue(0, "right")).toBeCloseTo((80 / 160) * 360);
  });

  it("emits the canonical 0 instead of 360 at the arc's red end", () => {
    /* Both arc ends are the same red; consumers must see one canonical hue
       and `aria-valuenow` must stay within 0..359. */
    expect(haloAngleToHue(350, "top")).toBe(0);
    /* Pointers in the gap snap to the nearer arc end — red either way. */
    expect(haloAngleToHue(270, "right")).toBe(0);
    expect(haloAngleToHue(90, "right")).toBe(0);
  });
});

describe("HaloPicker", () => {
  it("renders the round pad, hue smile arc, and current hex output", () => {
    render(<HaloPicker aria-label="Accent color" onChange={() => {}} value={value} />);

    const picker = screen.getByRole("group", { name: "Accent color" });
    expect(picker).toHaveAttribute("data-slot", "halo-picker");
    expect(screen.getByRole("slider", { name: "Hue" })).toHaveAttribute("aria-valuenow", "16");
    expect(screen.getByText("#d69e8a")).toBeInTheDocument();
  });

  it("reports saturation and lightness changes from the round pad", () => {
    const onChange = vi.fn<(value: HaloColor) => void>();
    render(<HaloPicker aria-label="Accent color" onChange={onChange} value={value} />);

    const pad = screen.getByTestId("halo-picker-pad");
    vi.spyOn(pad, "getBoundingClientRect").mockReturnValue({
      bottom: 124,
      height: 104,
      left: 10,
      right: 114,
      toJSON: () => ({}),
      top: 20,
      width: 104,
      x: 10,
      y: 20,
    });

    fireEvent.pointerDown(pad, { clientX: 62, clientY: 72, pointerId: 1 });

    expect(onChange).toHaveBeenCalledWith({ h: 16, l: 50, s: 50 });
  });

  it("ignores non-primary pointerdown on the pad and arc", () => {
    const onChange = vi.fn<(value: HaloColor) => void>();
    render(<HaloPicker aria-label="Accent color" onChange={onChange} value={value} />);

    const pad = screen.getByTestId("halo-picker-pad");
    fireEvent.pointerDown(pad, { button: 2, buttons: 2, clientX: 62, clientY: 72, pointerId: 1 });

    const arc = pad.parentElement?.querySelector("svg");
    if (!arc) {
      throw new Error("expected the hue arc svg");
    }
    fireEvent.pointerDown(arc, { button: 2, buttons: 2, clientX: 64, clientY: 120, pointerId: 1 });

    // A right-click must not commit a color.
    expect(onChange).not.toHaveBeenCalled();
  });

  it("changes hue through the range input", () => {
    const onChange = vi.fn<(value: HaloColor) => void>();
    render(<HaloPicker aria-label="Accent color" onChange={onChange} value={value} />);

    fireEvent.change(screen.getByRole("slider", { name: "Hue" }), { target: { value: "200" } });

    expect(onChange).toHaveBeenCalledWith({ h: 200, l: 69, s: 48 });
  });

  it("normalizes a hue of 360 from the range input to the canonical 0", () => {
    const onChange = vi.fn<(value: HaloColor) => void>();
    render(<HaloPicker aria-label="Accent color" onChange={onChange} value={value} />);

    fireEvent.change(screen.getByRole("slider", { name: "Hue" }), { target: { value: "360" } });

    expect(onChange).toHaveBeenCalledWith({ h: 0, l: 69, s: 48 });
  });

  it("adjusts saturation and lightness from the keyboard on the pad", () => {
    const onChange = vi.fn<(value: HaloColor) => void>();
    render(<HaloPicker aria-label="Accent color" onChange={onChange} value={value} />);

    const pad = screen.getByRole("slider", { name: "Saturation and lightness" });
    expect(pad).toHaveAttribute("tabindex", "0");
    expect(pad).toHaveAttribute("aria-valuenow", "48");
    expect(pad).toHaveAttribute("aria-valuetext", "Saturation 48%, Lightness 69%");

    fireEvent.keyDown(pad, { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith({ h: 16, l: 69, s: 49 });

    fireEvent.keyDown(pad, { key: "ArrowLeft", shiftKey: true });
    expect(onChange).toHaveBeenLastCalledWith({ h: 16, l: 69, s: 38 });

    fireEvent.keyDown(pad, { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith({ h: 16, l: 70, s: 48 });

    fireEvent.keyDown(pad, { key: "ArrowDown", shiftKey: true });
    expect(onChange).toHaveBeenLastCalledWith({ h: 16, l: 59, s: 48 });
  });

  /*
   * These assert the contract rather than the outcome, deliberately.
   *
   * jsdom dispatches whatever event you ask it to, so a test that fires
   * `click` at a target proves only that the test fired it — which is exactly
   * how a pointer-capture bug shipped in scrollframe past a green suite. The
   * browser is the thing that decides where a click lands, and it is the part
   * jsdom does not model. So assert the input that decides the browser's
   * behaviour: whether focus moved, and whether capture was taken.
   *
   * Verified in a real browser on 2026-08-09: click the pad, press
   * ArrowRight, and the saturation moves. Before the focus call it did not.
   */
  it("focuses the pad on pointerdown, so the keyboard still works after a click", () => {
    render(<HaloPicker aria-label="Accent color" onChange={() => {}} value={value} />);

    const pad = screen.getByTestId("halo-picker-pad");
    expect(pad).not.toHaveFocus();

    fireEvent.pointerDown(pad, { clientX: 62, clientY: 72, pointerId: 1 });

    // `onPadPointerDown` calls preventDefault, which suppresses the
    // compatibility mousedown and with it the default action that moves focus.
    // Without an explicit focus the pad's arrow keys are unreachable by anyone
    // who arrived with a pointer.
    expect(pad).toHaveFocus();
  });

  it("focuses the hue range input on arc pointerdown, since the arc is aria-hidden", () => {
    render(<HaloPicker aria-label="Accent color" onChange={() => {}} value={value} />);

    const arc = screen.getByTestId("halo-picker-pad").parentElement?.querySelector("svg");
    if (!arc) {
      throw new Error("expected the hue arc svg");
    }
    const hueInput = screen.getByRole("slider", { name: "Hue" });
    expect(hueInput).not.toHaveFocus();

    fireEvent.pointerDown(arc, { clientX: 64, clientY: 120, pointerId: 1 });

    expect(hueInput).toHaveFocus();
  });

  it("captures the pointer on pointerdown, which closes both controls to interactive children", () => {
    render(<HaloPicker aria-label="Accent color" onChange={() => {}} value={value} />);

    const pad = screen.getByTestId("halo-picker-pad");
    const setPadCapture = vi.fn<(pointerId: number) => void>();
    Object.defineProperty(pad, "setPointerCapture", { configurable: true, value: setPadCapture });

    fireEvent.pointerDown(pad, { clientX: 62, clientY: 72, pointerId: 4 });

    /*
     * Capturing this early is safe here and unsafe in a drag-scroll container,
     * and the difference is whether the element already knows the gesture is
     * its own. The pad commits a color on pointerdown, so it does.
     *
     * The price is permanent: capture retargets the rest of the gesture,
     * including the click, at the capturing element, so any interactive
     * descendant stops being activatable. Measured in a browser — a button
     * inside the pad receives pointerdown and then loses both pointerup and
     * click to the pad. The children below are decorative for that reason.
     */
    expect(setPadCapture).toHaveBeenCalledWith(4);
    expect(pad.querySelectorAll("a, button, input, select, textarea, [tabindex]")).toHaveLength(0);
  });

  it("clamps keyboard adjustments to the pad's pointer range", () => {
    const onChange = vi.fn<(value: HaloColor) => void>();
    render(
      <HaloPicker aria-label="Accent color" onChange={onChange} value={{ h: 16, l: 96, s: 99 }} />,
    );

    const pad = screen.getByRole("slider", { name: "Saturation and lightness" });

    fireEvent.keyDown(pad, { key: "ArrowRight", shiftKey: true });
    expect(onChange).toHaveBeenLastCalledWith({ h: 16, l: 96, s: 100 });

    // Lightness keeps the pad's 3..97 pointer clamp.
    fireEvent.keyDown(pad, { key: "ArrowUp", shiftKey: true });
    expect(onChange).toHaveBeenLastCalledWith({ h: 16, l: 97, s: 99 });
  });

  it("moves the pad and value readout when the arc is placed on top", () => {
    render(
      <HaloPicker aria-label="Accent color" onChange={() => {}} placement="top" value={value} />,
    );

    const picker = screen.getByRole("group", { name: "Accent color" });
    expect(picker).toHaveAttribute("data-placement", "top");

    const geometry = getHaloGeometry("top");
    const pad = screen.getByTestId("halo-picker-pad");
    expect(pad.style.top).toBe(`${geometry.centerY - 52}px`);

    /* The readout follows the arc to the top: it precedes the stage. */
    const output = screen.getByText("#d69e8a");
    const stage = pad.parentElement;
    if (stage === null) {
      throw new Error("stage missing");
    }
    const position = output.compareDocumentPosition(stage);
    // eslint-disable-next-line no-bitwise -- compareDocumentPosition returns a bitmask
    expect((position & Node.DOCUMENT_POSITION_FOLLOWING) > 0).toBe(true);
  });
});
