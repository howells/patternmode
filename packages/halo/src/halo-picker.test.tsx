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
});
