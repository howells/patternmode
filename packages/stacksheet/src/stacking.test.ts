import { describe, expect, it } from "vitest";

import {
  getAnimatedBorderRadius,
  getPanelStyles,
  getSlideFrom,
  getSlideTarget,
  getStackOffset,
  getStackTransform,
} from "./stacking";
import { resolveConfig } from "./config";
import type { ResolvedConfig, StackingConfig } from "./types";

const defaultStacking: StackingConfig = {
  offsetStep: 16,
  opacityStep: 0.15,
  radius: 12,
  renderThreshold: 3,
  scaleStep: 0.04,
};

describe(getStackTransform, () => {
  it("returns identity transform at depth 0", () => {
    const result = getStackTransform(0, defaultStacking);
    expect(result).toStrictEqual({
      borderRadius: 0,
      offset: 0,
      opacity: 1,
      scale: 1,
    });
  });

  it("returns identity for negative depth", () => {
    const result = getStackTransform(-1, defaultStacking);
    expect(result).toStrictEqual({
      borderRadius: 0,
      offset: 0,
      opacity: 1,
      scale: 1,
    });
  });

  it("scales and offsets at depth 1", () => {
    const result = getStackTransform(1, defaultStacking);
    expect(result.scale).toBe(0.96);
    expect(result.offset).toBe(16);
    expect(result.opacity).toBe(0.85);
    expect(result.borderRadius).toBe(12);
  });

  it("scales and offsets at depth 2", () => {
    const result = getStackTransform(2, defaultStacking);
    expect(result.scale).toBe(0.92);
    expect(result.offset).toBe(32);
    expect(result.opacity).toBe(0.7);
    expect(result.borderRadius).toBe(12);
  });

  it("clamps at renderThreshold boundary", () => {
    // depth === renderThreshold (3) → clamped to visualDepth 2, opacity 0
    const result = getStackTransform(3, defaultStacking);
    expect(result.scale).toBe(0.92);
    expect(result.offset).toBe(32);
    expect(result.opacity).toBe(0);
  });

  it("clamps beyond renderThreshold", () => {
    const result = getStackTransform(5, defaultStacking);
    expect(result.scale).toBe(0.92);
    expect(result.offset).toBe(32);
    expect(result.opacity).toBe(0);
  });

  it("enforces minimum scale of 0.5", () => {
    const bigStep: StackingConfig = {
      ...defaultStacking,
      renderThreshold: 10,
      scaleStep: 0.3,
    };
    const result = getStackTransform(3, bigStep);
    expect(result.scale).toBe(0.5);
  });
});

describe(getAnimatedBorderRadius, () => {
  it("returns top corners for bottom panel at depth 0", () => {
    const result = getAnimatedBorderRadius("bottom", 0, defaultStacking);
    expect(result).toStrictEqual({
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    });
  });

  it("returns stacking radius for bottom panel at depth > 0", () => {
    const result = getAnimatedBorderRadius("bottom", 1, defaultStacking);
    expect(result).toStrictEqual({
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    });
  });

  it("returns 0 border radius for right panel at depth 0", () => {
    const result = getAnimatedBorderRadius("right", 0, defaultStacking);
    expect(result).toStrictEqual({ borderRadius: 0 });
  });

  it("returns stacking radius for right panel at depth > 0", () => {
    const result = getAnimatedBorderRadius("right", 1, defaultStacking);
    expect(result).toStrictEqual({ borderRadius: 12 });
  });

  it("returns stacking radius for left panel at depth > 0", () => {
    const result = getAnimatedBorderRadius("left", 2, defaultStacking);
    expect(result).toStrictEqual({ borderRadius: 12 });
  });
});

describe(getSlideFrom, () => {
  it("returns x:100% for right side", () => {
    expect(getSlideFrom("right")).toStrictEqual({ x: "100%" });
  });

  it("returns x:-100% for left side", () => {
    expect(getSlideFrom("left")).toStrictEqual({ x: "-100%" });
  });

  it("returns y:100% for bottom side", () => {
    expect(getSlideFrom("bottom")).toStrictEqual({ y: "100%" });
  });

  it("defaults to right for unknown side", () => {
    expect(getSlideFrom("unknown")).toStrictEqual({ x: "100%" });
  });
});

describe(getSlideTarget, () => {
  it("returns zeroed position", () => {
    expect(getSlideTarget()).toStrictEqual({ x: 0, y: 0 });
  });
});

describe(getStackOffset, () => {
  it("returns empty object for zero offset", () => {
    expect(getStackOffset("right", 0)).toStrictEqual({});
  });

  it("returns negative x for right side", () => {
    expect(getStackOffset("right", 16)).toStrictEqual({ x: -16 });
  });

  it("returns positive x for left side", () => {
    expect(getStackOffset("left", 16)).toStrictEqual({ x: 16 });
  });

  it("returns negative y for bottom side", () => {
    expect(getStackOffset("bottom", 16)).toStrictEqual({ y: -16 });
  });

  it("returns empty for unknown side with offset", () => {
    expect(getStackOffset("unknown", 10)).toStrictEqual({});
  });
});

describe(getPanelStyles, () => {
  const mockConfig: ResolvedConfig = {
    ...resolveConfig(),
    maxWidth: "90vw",
    width: 420,
    zIndex: 100,
  };

  it("positions bottom panel with left/right/bottom anchors", () => {
    const styles = getPanelStyles("bottom", mockConfig, 0);
    expect(styles).toMatchObject({
      bottom: 0,
      left: 0,
      maxHeight: "85dvh",
      position: "fixed",
      right: 0,
    });
  });

  it("positions right panel with top/right/bottom anchors and width", () => {
    const styles = getPanelStyles("right", mockConfig, 0);
    expect(styles).toMatchObject({
      bottom: 0,
      maxWidth: "90vw",
      position: "fixed",
      right: 0,
      top: 0,
      width: 420,
    });
  });

  it("positions left panel with top/left/bottom anchors and width", () => {
    const styles = getPanelStyles("left", mockConfig, 0);
    expect(styles).toMatchObject({
      bottom: 0,
      left: 0,
      position: "fixed",
      top: 0,
      width: 420,
    });
  });

  it("increments zIndex by index", () => {
    const s0 = getPanelStyles("right", mockConfig, 0);
    const s1 = getPanelStyles("right", mockConfig, 1);
    const s2 = getPanelStyles("right", mockConfig, 2);
    expect(s0.zIndex).toBe(110);
    expect(s1.zIndex).toBe(111);
    expect(s2.zIndex).toBe(112);
  });

  it("sets willChange to transform", () => {
    const styles = getPanelStyles("right", mockConfig, 0);
    expect(styles).toMatchObject({
      willChange: "transform",
    });
  });
});
