import type { CSSProperties } from "react";
import { getSnapOffset } from "./snap-points";
import type { Side, StacksheetClassNames } from "./types";

// `header` is deprecated (the header bar is gone) and intentionally dropped
// from the resolved shape — nothing applies it anymore.
export type ResolvedClassNames = Required<Omit<StacksheetClassNames, "header">>;
const EMPTY_CLASSNAMES: ResolvedClassNames = {
  backdrop: "",
  panel: "",
};
export const resolveClassNames = (cn?: StacksheetClassNames): ResolvedClassNames => {
  if (!cn) {
    return EMPTY_CLASSNAMES;
  }
  return {
    backdrop: cn.backdrop ?? "",
    panel: cn.panel ?? "",
  };
};
/** ARIA attributes for a sheet's dialog panel. */
export interface DialogAriaProps {
  "aria-describedby"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-modal"?: "true";
  role?: string;
}

export const buildAriaProps = ({
  ariaLabel,
  hasDescription,
  hasTitle,
  isComposable,
  isModal,
  isTop,
  panelId,
}: {
  ariaLabel: string;
  hasDescription: boolean;
  hasTitle: boolean;
  isComposable: boolean;
  isModal: boolean;
  isTop: boolean;
  panelId: string;
}): DialogAriaProps => {
  if (!isTop) {
    return {};
  }
  const props: DialogAriaProps = { role: "dialog" };
  if (isModal) {
    props["aria-modal"] = "true";
  }
  if (isComposable) {
    // Only reference the title element when a Sheet.Title is actually
    // mounted — otherwise fall back to the sheet's aria-label so the
    // dialog is never left with a dangling aria-labelledby.
    if (hasTitle) {
      props["aria-labelledby"] = `${panelId}-title`;
    } else {
      props["aria-label"] = ariaLabel;
    }
    if (hasDescription) {
      props["aria-describedby"] = `${panelId}-desc`;
    }
  } else {
    props["aria-label"] = ariaLabel;
  }
  return props;
};
export const VISUAL_TWEEN = {
  duration: 0.25,
  ease: "easeOut" as const,
  type: "tween" as const,
};
const SHADOW_SM = "0px 1px 3px 0px rgba(0,0,0,0.06), 0px 6px 12px 0px rgba(0,0,0,0.06)";
const SHADOW_LG =
  "0px 8px 24px 0px rgba(0,0,0,0.06), 0px 24px 48px 0px rgba(0,0,0,0.04), 0px 48px 96px 0px rgba(0,0,0,0.03)";
export const getShadow = (isNested: boolean): string => (isNested ? SHADOW_SM : SHADOW_LG);

/**
 * Clear the on-screen keyboard. Plain sheets stay anchored at bottom: 0 and
 * pad their content up instead — the panel surface extends under the keyboard
 * (and iOS Safari's floating URL-pill chrome), so no backdrop gap ever shows
 * between sheet and keyboard, and measurement error hides behind the keyboard.
 * Snap sheets are transform-anchored, so they lift via `bottom` (not the
 * Motion `y` transform) and keep their viewport-driven sizing untouched.
 */
const getKeyboardClearance = (keyboardInset: number, padForKeyboard: boolean): CSSProperties => {
  if (keyboardInset <= 0) {
    return {};
  }
  return padForKeyboard ? { paddingBottom: keyboardInset } : { bottom: keyboardInset };
};

export const buildPanelStyle = (
  panelStyles: CSSProperties,
  isTop: boolean,
  hasPanelClass: boolean,
  keyboardInset: number,
  padForKeyboard: boolean,
): CSSProperties => {
  const style: CSSProperties = {
    ...panelStyles,
    ...getKeyboardClearance(keyboardInset, padForKeyboard),
    pointerEvents: isTop ? "auto" : "none",
  };
  if (!isTop) {
    style.contain = "layout style paint";
  }
  if (!hasPanelClass) {
    style.background = "var(--background, #fff)";
    style.borderColor = "var(--border, transparent)";
  }
  return style;
};
export const computeSnapYOffset = (
  side: Side,
  snapHeights: number[],
  activeSnapIndex: number,
  measuredHeight: number,
): number => {
  if (side !== "bottom" || snapHeights.length === 0 || measuredHeight <= 0) {
    return 0;
  }
  return getSnapOffset(activeSnapIndex, snapHeights, measuredHeight);
};
