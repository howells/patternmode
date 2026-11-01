// oxlint-disable typescript/no-deprecated -- Exercise the legacy API contract and complete MediaQueryList test doubles.
import { describe, expect, it } from "vitest";

import {
  buildAriaProps,
  buildPanelStyle,
  computeSnapYOffset,
  getShadow,
  resolveClassNames,
} from "./renderer-helpers";

describe("renderer helpers", () => {
  it("resolves missing class names to empty strings", () => {
    expect(resolveClassNames()).toStrictEqual({
      backdrop: "",
      panel: "",
    });
    expect(resolveClassNames({ panel: "panel" })).toStrictEqual({
      backdrop: "",
      panel: "panel",
    });
  });

  it("ignores the deprecated header class name", () => {
    expect(resolveClassNames({ header: "legacy" })).toStrictEqual({
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
    ).toStrictEqual({});
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
    ).toStrictEqual({
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
    ).toStrictEqual({
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
    ).toStrictEqual({
      "aria-label": "Filters",
      "aria-modal": "true",
      role: "dialog",
    });
  });

  it("adds fallback panel styles when no class name is supplied", () => {
    expect(buildPanelStyle({ zIndex: 2 }, true, false, 0, true)).toStrictEqual({
      background: "var(--background, #fff)",
      borderColor: "var(--border, transparent)",
      pointerEvents: "auto",
      zIndex: 2,
    });
    expect(buildPanelStyle({ zIndex: 2 }, false, true, 0, true)).toStrictEqual({
      contain: "layout style paint",
      pointerEvents: "none",
      zIndex: 2,
    });
  });

  it("clears the keyboard by padding plain sheets and lifting snap sheets", () => {
    // Plain sheet: surface stays anchored at bottom 0, content pads up.
    const padded = buildPanelStyle({ zIndex: 2 }, true, true, 300, true);
    expect(padded).toMatchObject({ paddingBottom: 300 });
    expect(padded).not.toHaveProperty("bottom");
    // Snap sheet: lifted, viewport-driven sizing untouched.
    const lifted = buildPanelStyle({ zIndex: 2 }, true, true, 300, false);
    expect(lifted).toMatchObject({ bottom: 300 });
    expect(lifted).not.toHaveProperty("paddingBottom");
    expect(buildPanelStyle({ zIndex: 2 }, true, true, 0, true)).not.toHaveProperty("paddingBottom");
  });

  it("computes snap offsets only for measured bottom sheets", () => {
    expect(computeSnapYOffset("right", [100, 300], 0, 400)).toBe(0);
    expect(computeSnapYOffset("bottom", [], 0, 400)).toBe(0);
    expect(computeSnapYOffset("bottom", [100, 300], 0, 0)).toBe(0);
    expect(computeSnapYOffset("bottom", [100, 300], 0, 400)).toBe(300);
  });

  it("returns a light shadow for covered panels and a deep one for the Active Sheet", () => {
    expect(getShadow(true)).toContain("6px 12px");
    expect(getShadow(false)).toContain("48px 96px");
  });
});
