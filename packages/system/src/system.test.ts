import { describe, expect, it } from "vitest";

import {
  clamp,
  getObjectSizingStyle,
  getPatternmodeSizeValue,
  getSizeVariableStyle,
  joinClassNames,
  PATTERNMODE_EXTENDED_SIZE_VALUES,
  PATTERNMODE_EXTENDED_SIZES,
  PATTERNMODE_SIZES,
  toCssSize,
  wrapHue,
} from "./index";
import type { CssSize } from "./index";

describe("Patternmode system utilities", () => {
  it("exposes the shared component size scale", () => {
    expect(PATTERNMODE_SIZES).toStrictEqual(["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"]);
    expect(getPatternmodeSizeValue("2xs")).toBe("1rem");
    expect(getPatternmodeSizeValue("base")).toBe("2rem");
    expect(getPatternmodeSizeValue("3xl")).toBe("4rem");
    expect(getSizeVariableStyle("lg", "--patternmode-swatch-size")).toStrictEqual({
      "--patternmode-swatch-size": "2.5rem",
    });
  });

  it("extends the size scale past 3xl for larger color controls", () => {
    expect(PATTERNMODE_EXTENDED_SIZES).toStrictEqual([
      ...PATTERNMODE_SIZES,
      "4xl",
      "5xl",
      "6xl",
      "7xl",
    ]);
    expect(PATTERNMODE_EXTENDED_SIZE_VALUES["3xl"]).toBe("4rem");
    expect(PATTERNMODE_EXTENDED_SIZE_VALUES["7xl"]).toBe("6rem");
  });

  it("clamps into a range and keeps NaN visible", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
    expect(clamp(Number.NaN, 0, 10)).toBeNaN();
  });

  it("wraps hues into [0, 360)", () => {
    expect([0, 360, -40, -0, -1e-14, 725].map(wrapHue)).toStrictEqual([0, 0, 320, 0, 0, 5]);
    expect(wrapHue(Number.POSITIVE_INFINITY)).toBeNaN();
  });

  it("normalizes CSS sizes from numbers and strings", () => {
    expect(toCssSize(12)).toBe("12px");
    expect(toCssSize("2.5rem")).toBe("2.5rem");
    const unset: CssSize | undefined = [12, undefined][1];
    expect(toCssSize(unset)).toBeUndefined();
  });

  it("joins class names without leaking falsey values", () => {
    expect(joinClassNames("base", false, null, undefined, "active")).toBe("base active");
    expect(joinClassNames(false, null)).toBeUndefined();
  });

  it("returns object sizing styles with full-cover defaults", () => {
    expect(getObjectSizingStyle()).toStrictEqual({
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      width: "100%",
    });
    expect(
      getObjectSizingStyle({
        fit: "contain",
        height: "4rem",
        position: "top left",
        width: 32,
      }),
    ).toStrictEqual({
      height: "4rem",
      objectFit: "contain",
      objectPosition: "top left",
      width: "32px",
    });
  });
});
