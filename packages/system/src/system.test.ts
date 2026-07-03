import { describe, expect, it } from "vitest";

import {
  BREAKPOINTS,
  getBreakpointPrefix,
  getObjectSizingStyle,
  getPatternmodeSizeValue,
  getResponsiveClasses,
  getSizeVariableStyle,
  isResponsiveValue,
  joinClassNames,
  PATTERNMODE_SIZES,
  toCssSize,
} from "./index";

describe("Patternmode system utilities", () => {
  it("exposes the shared component size scale", () => {
    expect(PATTERNMODE_SIZES).toEqual(["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"]);
    expect(getPatternmodeSizeValue("2xs")).toBe("1rem");
    expect(getPatternmodeSizeValue("base")).toBe("2rem");
    expect(getPatternmodeSizeValue("3xl")).toBe("4rem");
    expect(getSizeVariableStyle("lg", "--patternmode-swatch-size")).toEqual({
      "--patternmode-swatch-size": "2.5rem",
    });
  });

  it("normalizes CSS sizes from numbers and strings", () => {
    expect(toCssSize(12)).toBe("12px");
    expect(toCssSize("2.5rem")).toBe("2.5rem");
    expect(toCssSize()).toBeUndefined();
  });

  it("joins class names without leaking falsey values", () => {
    expect(joinClassNames("base", false, null, undefined, "active")).toBe("base active");
    expect(joinClassNames(false, null)).toBeUndefined();
  });

  it("expands responsive values for screen and container modes", () => {
    const classMap = {
      base: "size-8",
      lg: "size-10",
      sm: "size-6",
    };

    expect(BREAKPOINTS).toContain("md");
    expect(getBreakpointPrefix("md")).toBe("md:");
    expect(getBreakpointPrefix("md", "container")).toBe("@md:");
    expect(getResponsiveClasses({ base: "sm", md: "base", xl: "lg" }, classMap)).toEqual([
      "size-6",
      "md:size-8",
      "xl:size-10",
    ]);
    expect(getResponsiveClasses({ base: "sm", md: "base" }, classMap, "container")).toEqual([
      "size-6",
      "@md:size-8",
    ]);
  });

  it("classifies breakpoint maps but not plain token values as responsive", () => {
    expect(isResponsiveValue({ base: "sm", md: "lg" })).toBe(true);
    expect(isResponsiveValue<number>({ base: 4 })).toBe(true);
    expect(isResponsiveValue("sm")).toBe(false);
    expect(isResponsiveValue(4)).toBe(false);
    expect(isResponsiveValue()).toBe(false);
    // @ts-expect-error -- arbitrary object types are not valid responsive tokens
    isResponsiveValue<Date>(new Date());
  });

  it("returns object sizing styles with full-cover defaults", () => {
    expect(getObjectSizingStyle()).toEqual({
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
    ).toEqual({
      height: "4rem",
      objectFit: "contain",
      objectPosition: "top left",
      width: "32px",
    });
  });
});
