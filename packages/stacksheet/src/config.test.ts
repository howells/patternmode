import { describe, expect, it } from "vitest";

import { resolveConfig } from "./config";

const onSnapPointChange = () => {};
const onCloseComplete = (_reason: string) => {};

describe(resolveConfig, () => {
  it("returns all defaults when called with no args", () => {
    const config = resolveConfig();
    expect(config).toMatchObject({
      ariaLabel: "Sheet dialog",
      breakpoint: 768,
      closeOnBackdrop: true,
      closeOnEscape: true,
      closeThreshold: 0.25,
      dismissible: true,
      drag: true,
      lockScroll: true,
      maxDepth: Number.POSITIVE_INFINITY,
      maxWidth: "90vw",
      modal: true,
      scaleBackgroundAmount: 0.97,
      shouldScaleBackground: false,
      showOverlay: true,
      velocityThreshold: 0.5,
      width: 420,
      zIndex: 100,
    });
  });

  it("resolves responsive side defaults", () => {
    const config = resolveConfig();
    expect(config.side).toStrictEqual({ desktop: "right", mobile: "bottom" });
  });

  it("resolves string side to both desktop and mobile", () => {
    const config = resolveConfig({ side: "left" });
    expect(config.side).toStrictEqual({ desktop: "left", mobile: "left" });
  });

  it("resolves responsive side with partial override", () => {
    const config = resolveConfig({ side: { desktop: "left" } });
    expect(config.side.desktop).toBe("left");
    expect(config.side.mobile).toBe("bottom");
  });

  it("resolves spring preset string", () => {
    const config = resolveConfig({ spring: "subtle" });
    expect(config.spring.damping).toBe(30);
    expect(config.spring.stiffness).toBe(300);
    expect(config.spring.mass).toBe(1);
  });

  it("resolves partial spring config", () => {
    const config = resolveConfig({ spring: { damping: 50 } });
    expect(config.spring.damping).toBe(50);
    expect(config.spring.stiffness).toBe(400);
    expect(config.spring.mass).toBe(1);
  });

  it("resolves stacking defaults", () => {
    const config = resolveConfig();
    expect(config.stacking.scaleStep).toBe(0.04);
    expect(config.stacking.offsetStep).toBe(16);
    expect(config.stacking.radius).toBe(12);
    expect(config.stacking.renderThreshold).toBe(3);
  });

  // ── Handle defaults ──────────────────────────

  it("defaults handle to inside", () => {
    const config = resolveConfig();
    expect(config.handle).toBe("inside");
  });

  it("passes through handle config", () => {
    const config = resolveConfig({ handle: "outside" });
    expect(config.handle).toBe("outside");
  });

  // ── Snap point defaults ──────────────────────

  it("defaults snapPoints to empty array", () => {
    const config = resolveConfig();
    expect(config.snapPoints).toStrictEqual([]);
  });

  it("defaults snapToSequentialPoints to false", () => {
    const config = resolveConfig();
    expect(config.snapToSequentialPoints).toBe(false);
  });

  it("passes through snapPoints config", () => {
    const config = resolveConfig({ snapPoints: [0.3, 0.6, 1] });
    expect(config.snapPoints).toStrictEqual([0.3, 0.6, 1]);
  });

  it("passes through snap callbacks", () => {
    const config = resolveConfig({
      onSnapPointChange,
      snapPointIndex: 1,
      snapToSequentialPoints: true,
    });
    expect(config.snapPointIndex).toBe(1);
    expect(config.onSnapPointChange).toBe(onSnapPointChange);
    expect(config.snapToSequentialPoints).toBe(true);
  });

  // ── Close reason callback ────────────────────

  it("passes through onCloseComplete with reason signature", () => {
    const config = resolveConfig({ onCloseComplete });
    expect(config.onCloseComplete).toBe(onCloseComplete);
  });

  it("allows overriding all values", () => {
    const config = resolveConfig({
      ariaLabel: "Custom",
      breakpoint: 640,
      closeOnBackdrop: false,
      closeOnEscape: false,
      closeThreshold: 0.5,
      dismissible: false,
      drag: false,
      lockScroll: false,
      maxDepth: 3,
      maxWidth: "80vw",
      modal: false,
      scaleBackgroundAmount: 0.9,
      shouldScaleBackground: true,
      showOverlay: false,
      velocityThreshold: 1,
      width: 500,
      zIndex: 200,
    });
    expect(config).toMatchObject({
      closeOnEscape: false,
      drag: false,
      maxDepth: 3,
      modal: false,
      width: 500,
      zIndex: 200,
    });
  });
});
