// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getHaloHueHandlePosition,
  getHaloPadHandlePosition,
  HaloPicker,
  hslToHex,
  pointerToHaloHue,
  pointerToHaloPad,
} from "./index";

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
    expect(getHaloHueHandlePosition(0)).toMatchObject({
      x: expect.any(Number),
      y: expect.any(Number),
    });
  });

  it("converts pointer positions into bounded color channels", () => {
    const padRect = { height: 104, left: 10, top: 20, width: 104 } as DOMRect;
    expect(pointerToHaloPad(62, 72, padRect)).toEqual({ l: 50, s: 50 });

    const svgRect = { height: 128, left: 0, top: 0, width: 128 } as DOMRect;
    expect(pointerToHaloHue(128, 78, svgRect)).toBeGreaterThan(0);
  });
});

describe("HaloPicker", () => {
  it("renders the round pad, hue smile arc, and current hex output", () => {
    render(<HaloPicker aria-label="Accent color" onChange={() => null} value={value} />);

    const picker = screen.getByRole("group", { name: "Accent color" });
    expect(picker).toHaveAttribute("data-slot", "halo-picker");
    expect(screen.getByRole("slider", { name: "Hue" })).toHaveAttribute("aria-valuenow", "16");
    expect(screen.getByText("#d69e8a")).toBeInTheDocument();
  });

  it("reports saturation and lightness changes from the round pad", () => {
    const onChange = vi.fn();
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
});
