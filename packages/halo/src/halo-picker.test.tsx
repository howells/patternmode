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
    expect(haloAngleToHue(350, "top")).toBe(360);
    /* The right placement's span crosses 0° and must read continuously. */
    expect(haloAngleToHue(0, "right")).toBeCloseTo((80 / 160) * 360);
    /* Pointers in the gap snap to the nearer arc end. */
    expect(haloAngleToHue(270, "right")).toBe(0);
    expect(haloAngleToHue(90, "right")).toBe(360);
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
