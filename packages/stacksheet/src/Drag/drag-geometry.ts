import type { Side } from "../types";
import { MAX_ANGLE_DEG, RUBBER_BAND_CONSTANT } from "./drag-constants";
import type { DragAxis, DragSign } from "./drag-types";

/** Input types that are pressed rather than typed into or slid, so a drag may start on them. */
const PRESSABLE_INPUT_TYPES = new Set(["button", "checkbox", "image", "radio", "reset", "submit"]);

/**
 * Elements a drag must never start from: fields you type into or slide
 * (text inputs, ranges, selects, textareas, editable content), elements that
 * own a native drag (`draggable="true"`), and anything the consumer marks with
 * `data-stacksheet-no-drag`.
 *
 * Links and buttons are deliberately absent. A drag may start on them; the
 * click that would follow a committed drag is suppressed, so a tap is still a
 * tap and a drag never activates them.
 */
const DRAG_EXEMPT_SELECTOR =
  'textarea, select, [contenteditable]:not([contenteditable="false"]), [draggable="true"], [data-stacksheet-no-drag]';

export const isDragExempt = (el: Element): boolean => {
  if (el.closest(DRAG_EXEMPT_SELECTOR) !== null) {
    return true;
  }
  if (el instanceof HTMLElement && el.isContentEditable) {
    return true;
  }
  const input = el.closest("input");
  return input !== null && !PRESSABLE_INPUT_TYPES.has(input.type);
};

/**
 * Walk up from `el` to find the nearest scrollable ancestor.
 * Returns null if nothing is scrollable in the dismiss axis.
 */
export const findScrollableAncestor = (el: Element, axis: DragAxis): Element | null => {
  let current: Element | null = el;
  while (current) {
    if (current instanceof HTMLElement) {
      const style = getComputedStyle(current);
      const overflow = axis === "y" ? style.overflowY : style.overflowX;
      if (overflow === "auto" || overflow === "scroll") {
        const scrollable =
          axis === "y"
            ? current.scrollHeight > current.clientHeight
            : current.scrollWidth > current.clientWidth;
        if (scrollable) {
          return current;
        }
      }
    }
    current = current.parentElement;
  }
  return null;
};

/**
 * Check if a scrollable element is at its edge in the given direction.
 * For bottom sheets (sign=1, axis=y), "at edge" means scrolled to top.
 * For left panels (sign=-1, axis=x), "at edge" means scrolled to right end.
 */
export const isAtScrollEdge = (el: Element, axis: DragAxis, sign: DragSign): boolean => {
  if (axis === "y") {
    // Dismiss down (sign=1): at edge when scrollTop ≈ 0
    // Dismiss up (sign=-1): at edge when scrolled to bottom
    return sign === 1 ? el.scrollTop <= 0 : el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
  }
  return sign === 1 ? el.scrollLeft <= 0 : el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
};

/** The axis a sheet is dismissed along and the direction of travel on it. */
export interface DismissAxis {
  axis: DragAxis;
  sign: DragSign;
}

/**
 * Get the dismiss direction axis and sign for a given side.
 * - right panel → dismiss by dragging right (+x)
 * - left panel → dismiss by dragging left (-x)
 * - bottom panel → dismiss by dragging down (+y)
 */
export const getDismissAxis = (side: Side): DismissAxis => {
  switch (side) {
    case "right": {
      return { axis: "x", sign: 1 };
    }
    case "left": {
      return { axis: "x", sign: -1 };
    }
    case "bottom": {
      return { axis: "y", sign: 1 };
    }
    default: {
      return { axis: "x", sign: 1 };
    }
  }
};

const getAngleFromAxis = (dx: number, dy: number, axis: DragAxis): number => {
  const along = Math.abs(axis === "x" ? dx : dy);
  const across = Math.abs(axis === "x" ? dy : dx);
  return along === 0 ? 90 : (Math.atan(across / along) * 180) / Math.PI;
};

/** What a gesture past the dead zone is allowed to become. */
export interface GestureContext {
  axis: DragAxis;
  /**
   * The Sheet rests below its most open position (a lower Snap Point), so a
   * drag toward open expands it rather than scrolling its content.
   */
  expandable: boolean;
  /**
   * Whether a drag toward open (against the dismiss direction) may commit.
   * Touch allows it, so the Sheet rubber-bands or expands like a native one;
   * a mouse keeps that direction for text selection.
   */
  openward: boolean;
  /** Nearest scrollable ancestor on the dismiss axis, or null */
  scrollEl: Element | null;
  sign: DragSign;
}

/**
 * Decide whether a pointer gesture commits as a drag or is left to the
 * browser (scrolling, text selection).
 *
 * - Off-axis movement never drags.
 * - Toward dismiss: drags unless the content under the pointer can still
 *   scroll that way. Scrolled to its top, a bottom Sheet's content hands the
 *   pull to the Sheet, as on iOS.
 * - Toward open: drags (expanding to a higher Snap Point, or rubber-banding
 *   past rest) unless the content can scroll that way, except that a Sheet
 *   resting at a lower Snap Point expands before its content scrolls.
 */
export const commitGesture = (dx: number, dy: number, context: GestureContext): "drag" | "none" => {
  const { axis, expandable, openward, scrollEl, sign } = context;
  if (getAngleFromAxis(dx, dy, axis) > MAX_ANGLE_DEG) {
    return "none";
  }
  const towardDismiss = (axis === "x" ? dx : dy) * sign >= 0;
  if (towardDismiss) {
    return scrollEl === null || isAtScrollEdge(scrollEl, axis, sign) ? "drag" : "none";
  }
  if (!openward) {
    return "none";
  }
  if (scrollEl === null) {
    return "drag";
  }
  return expandable && isAtScrollEdge(scrollEl, axis, sign) ? "drag" : "none";
};

export const getPanelDimension = (panel: HTMLElement | null, axis: DragAxis): number => {
  if (!panel) {
    return 300;
  }
  return axis === "x" ? panel.offsetWidth : panel.offsetHeight;
};

/**
 * Scroll-view rubber band: past a boundary, the Sheet follows less and less
 * instead of stopping at an invisible wall. `overshoot` is px past the edge;
 * the result approaches, but never reaches, `size`.
 */
export const rubberBand = (overshoot: number, size: number, c = RUBBER_BAND_CONSTANT): number =>
  size <= 0 ? 0 : (overshoot * size * c) / (size + c * Math.abs(overshoot));

/** Inverse of `rubberBand`: the finger distance that produces a given visible overshoot. */
export const unRubberBand = (visible: number, size: number, c = RUBBER_BAND_CONSTANT): number => {
  const capped = Math.min(Math.abs(visible), size * 0.99);
  if (size <= 0 || capped === 0) {
    return 0;
  }
  return Math.sign(visible) * ((capped * size) / (c * (size - capped)));
};
