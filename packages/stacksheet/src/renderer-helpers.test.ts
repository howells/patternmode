import { describe, expect, it, vi } from "vitest";

import {
  buildAnimateTarget,
  buildAriaProps,
  buildPanelStyle,
  buildPanelTransition,
  computeSnapYOffset,
  getBottomSlideDistance,
  getDragTransform,
  getInitialRadius,
  getShadow,
  resolveClassNames,
  resolveSlideFrom,
} from "./renderer-helpers";

describe("renderer helpers", () => {
  it("resolves missing class names to empty strings", () => {
    expect(resolveClassNames()).toEqual({
      backdrop: "",
      panel: "",
    });
    expect(resolveClassNames({ panel: "panel" })).toEqual({
      backdrop: "",
      panel: "panel",
    });
  });

  it("ignores the deprecated header class name", () => {
    expect(resolveClassNames({ header: "legacy" })).toEqual({
      backdrop: "",
      panel: "",
    });
  });

  it("builds ARIA props only for the top panel", () => {
    expect(
      buildAriaProps({
        ariaLabel: "Sheet",
        hasDescription: true,
        hasTitle: true,
        isComposable: true,
        isModal: true,
        isTop: false,
        panelId: "panel-1",
      }),
    ).toEqual({});
    expect(
      buildAriaProps({
        ariaLabel: "Sheet",
        hasDescription: true,
        hasTitle: true,
        isComposable: true,
        isModal: true,
        isTop: true,
        panelId: "panel-1",
      }),
    ).toEqual({
      "aria-describedby": "panel-1-desc",
      "aria-labelledby": "panel-1-title",
      "aria-modal": "true",
      role: "dialog",
    });
    expect(
      buildAriaProps({
        ariaLabel: "Sheet",
        hasDescription: false,
        hasTitle: false,
        isComposable: false,
        isModal: false,
        isTop: true,
        panelId: "panel-1",
      }),
    ).toEqual({
      "aria-label": "Sheet",
      role: "dialog",
    });
  });

  it("falls back to aria-label when a composable sheet has no Sheet.Title", () => {
    expect(
      buildAriaProps({
        ariaLabel: "Filters",
        hasDescription: false,
        hasTitle: false,
        isComposable: true,
        isModal: true,
        isTop: true,
        panelId: "panel-1",
      }),
    ).toEqual({
      "aria-label": "Filters",
      "aria-modal": "true",
      role: "dialog",
    });
  });

  it("maps drag offset to the active side", () => {
    expect(getDragTransform("right", 14)).toEqual({ x: 14 });
    expect(getDragTransform("left", 14)).toEqual({ x: -14 });
    expect(getDragTransform("bottom", 14)).toEqual({ y: 14 });
    expect(getDragTransform("right", 0)).toEqual({});
  });

  it("adds fallback panel styles when no class name is supplied", () => {
    expect(buildPanelStyle({ zIndex: 2 }, true, false, true, 0, true)).toEqual({
      background: "var(--background, #fff)",
      borderColor: "var(--border, transparent)",
      pointerEvents: "auto",
      transition: "none",
      zIndex: 2,
    });
    expect(buildPanelStyle({ zIndex: 2 }, false, true, false, 0, true)).toEqual({
      contain: "layout style paint",
      pointerEvents: "none",
      zIndex: 2,
    });
  });

  it("lifts the panel above the keyboard, clamping height only when asked", () => {
    expect(buildPanelStyle({ zIndex: 2 }, true, true, false, 300, true)).toMatchObject({
      bottom: 300,
      maxHeight: "calc(85dvh - 300px)",
    });
    const unclamped = buildPanelStyle({ zIndex: 2 }, true, true, false, 300, false);
    expect(unclamped).toMatchObject({ bottom: 300 });
    expect(unclamped).not.toHaveProperty("maxHeight");
    expect(buildPanelStyle({ zIndex: 2 }, true, true, false, 0, true)).not.toHaveProperty("bottom");
  });

  it("builds transition objects for dragging and stacked panels", () => {
    expect(buildPanelTransition(true, true, { type: "spring" }, { type: "tween" })).toEqual({
      duration: 0,
      type: "tween",
    });
    expect(buildPanelTransition(false, false, { type: "spring" }, { type: "tween" })).toMatchObject(
      {
        borderRadius: { duration: 0.25, ease: "easeOut", type: "tween" },
        boxShadow: { duration: 0.25, ease: "easeOut", type: "tween" },
        type: "tween",
      },
    );
  });

  it("computes snap offsets only for measured bottom sheets", () => {
    expect(computeSnapYOffset("right", [100, 300], 0, 400)).toBe(0);
    expect(computeSnapYOffset("bottom", [], 0, 400)).toBe(0);
    expect(computeSnapYOffset("bottom", [100, 300], 0, 0)).toBe(0);
    expect(computeSnapYOffset("bottom", [100, 300], 0, 400)).toBe(300);
  });

  it("resolves bottom slide fallback distance from measurement or viewport", () => {
    expect(getBottomSlideDistance(240)).toBe(240);
    vi.stubGlobal("window", { innerHeight: 720 });
    expect(getBottomSlideDistance(0)).toBe(720);
    vi.unstubAllGlobals();
    expect(resolveSlideFrom("right", { x: 100 }, 300)).toEqual({ x: 100 });
    expect(resolveSlideFrom("bottom", { y: 100 }, 300)).toEqual({ y: 300 });
  });

  it("returns side-specific initial radius and nested shadows", () => {
    expect(getInitialRadius("bottom")).toEqual({
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    });
    expect(getInitialRadius("left")).toEqual({ borderRadius: 0 });
    expect(getShadow(true)).toContain("6px 12px");
    expect(getShadow(false)).toContain("48px 96px");
  });

  it("merges animation target layers and lets snap y override base y", () => {
    expect(
      buildAnimateTarget(
        { y: 100 },
        { x: 12 },
        { y: 8 },
        { opacity: 0.8, scale: 0.96 },
        { borderRadius: 16 },
        { type: "spring" },
        40,
        false,
      ),
    ).toMatchObject({
      borderRadius: 16,
      opacity: 0.8,
      scale: 0.96,
      x: 12,
      y: 48,
    });
  });
});
