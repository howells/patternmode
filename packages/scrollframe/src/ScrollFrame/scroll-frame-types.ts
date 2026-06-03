import type * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithRef,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";

export const SCROLL_FRAME_AXES = ["vertical", "horizontal", "both"] as const;
export const SCROLL_FRAME_EDGES = ["start", "end"] as const;
export const SCROLL_FRAME_SCROLLBARS = ["auto", "always", "hover", "hidden"] as const;
export const SCROLL_FRAME_CONTROL_VISIBILITY = ["auto", "disabled", "hidden"] as const;

export type ScrollFrameAxis = "vertical" | "horizontal";
export type ScrollFrameAxes = (typeof SCROLL_FRAME_AXES)[number];
export type ScrollFrameEdge = (typeof SCROLL_FRAME_EDGES)[number];
export type ScrollFrameScrollbarVisibility = (typeof SCROLL_FRAME_SCROLLBARS)[number];
export type ScrollFrameControlVisibility = (typeof SCROLL_FRAME_CONTROL_VISIBILITY)[number];

/** Fade placement for scroll-edge gradients. `true` renders both edges. */
export type ScrollFrameFadeEdges = "none" | "start" | "end" | "both" | boolean;

/** Global fade setting or per-axis fade settings when `axes="both"`. */
export type ScrollFrameFadeConfig =
  | ScrollFrameFadeEdges
  | Partial<Record<ScrollFrameAxis, ScrollFrameFadeEdges>>;

/** Axis used by pointer drag-scroll; "auto" follows the dominant drag axis. */
export type ScrollFrameDragScrollAxis = "auto" | ScrollFrameAxes;

/**
 * Distance used by movement controls.
 *
 * `"page"` scrolls roughly one viewport, numbers are pixels, and callbacks can
 * compute an axis-specific step from the live ScrollFrame state.
 */
export type ScrollFrameScrollStep =
  | "page"
  | number
  | ((state: ScrollFrameContextValue, axis: ScrollFrameAxis) => number);
export type ScrollFrameScrollBehavior = ScrollBehavior;

/** Current scrollability and edge position for one axis. */
export interface ScrollFrameAxisState {
  atEnd: boolean;
  atStart: boolean;
  scrollable: boolean;
}

/** Current edge state for both axes, even when only one axis is enabled. */
export interface ScrollFrameEdgeState {
  horizontal: ScrollFrameAxisState;
  vertical: ScrollFrameAxisState;
}

/** Built-in previous/next movement control configuration. */
export interface ScrollFrameControlsConfig {
  /**
   * Axis controlled by the movement buttons.
   *
   * Default the enabled axis, or `"vertical"` when both axes are enabled.
   */
  axis?: ScrollFrameAxis;
  /**
   * When controls render.
   *
   * Default `"auto"`.
   */
  visibility?: ScrollFrameControlVisibility;
}

/** Pointer drag-scroll configuration. */
export interface ScrollFrameDragScrollConfig {
  /**
   * Pointer movement in px before drag-scroll activates.
   *
   * Default `8`.
   */
  activationDistance?: number;
  /**
   * Axis to move while dragging.
   *
   * Default `"auto"`.
   */
  axis?: ScrollFrameDragScrollAxis;
  /**
   * Whether to apply the drag cursor affordance.
   *
   * Default `true`.
   */
  cursor?: boolean;
  /** Selector for descendants that should not initiate drag-scroll. */
  ignoreSelector?: string;
}

export interface ScrollFrameResolvedDragScrollConfig {
  activationDistance: number;
  axis: ScrollFrameDragScrollAxis;
  cursor: boolean;
  ignoreSelector: string;
}

export interface ScrollFrameProps extends Omit<
  ComponentPropsWithRef<typeof RadixScrollArea.Root>,
  "type"
> {
  /**
   * Enabled scroll axes.
   *
   * Default `"vertical"`.
   */
  axes?: ScrollFrameAxes;
  children: ReactNode;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  /**
   * Renders built-in previous/next controls or configures them.
   *
   * Default `false`.
   */
  controls?: boolean | ScrollFrameControlsConfig;
  /** Shared visibility default for movement controls. */
  controlVisibility?: ScrollFrameControlVisibility;
  /** Enables click-and-drag scrolling on the viewport. */
  dragScroll?: boolean | ScrollFrameDragScrollConfig;
  fadeColor?: string;
  fadeSize?: number | string;
  /**
   * Scroll-edge fades. `true` renders both edges on enabled axes.
   *
   * Default `true`.
   */
  fades?: ScrollFrameFadeConfig;
  /**
   * Scrollbar visibility while keeping Radix scroll plumbing mounted.
   *
   * Default `"auto"`.
   */
  scrollbars?: ScrollFrameScrollbarVisibility;
  /** Scroll behavior for movement controls. Honors reduced motion by default. */
  scrollBehavior?: ScrollFrameScrollBehavior;
  scrollStep?: ScrollFrameScrollStep;
  viewportClassName?: string;
  /** Ref for the underlying Radix viewport element. */
  viewportRef?: Ref<HTMLDivElement>;
  viewportStyle?: CSSProperties;
}

/** Low-level root props for custom ScrollFrame compositions. */
export interface ScrollFrameRootProps extends Omit<
  ComponentPropsWithRef<typeof RadixScrollArea.Root>,
  "type"
> {
  /**
   * Enabled scroll axes.
   *
   * Default `"vertical"`.
   */
  axes?: ScrollFrameAxes;
  children: ReactNode;
  /** Visibility default inherited by compound movement controls. */
  controlVisibility?: ScrollFrameControlVisibility;
  /** Enables click-and-drag scrolling for registered viewports. */
  dragScroll?: boolean | ScrollFrameDragScrollConfig;
  fadeColor?: string;
  fadeSize?: number | string;
  scrollbars?: ScrollFrameScrollbarVisibility;
  /** Scroll behavior used by context movement helpers. */
  scrollBehavior?: ScrollFrameScrollBehavior;
  scrollStep?: ScrollFrameScrollStep;
}

/** Viewport props for custom ScrollFrame compositions. */
export interface ScrollFrameViewportProps extends ComponentPropsWithRef<
  typeof RadixScrollArea.Viewport
> {
  children: ReactNode;
  /** Class applied to the inner content wrapper, not the viewport. */
  contentClassName?: string;
  /** Style applied to the inner content wrapper, not the viewport. */
  contentStyle?: CSSProperties;
  /** Ref for the underlying Radix viewport element. */
  viewportRef?: Ref<HTMLDivElement>;
}

/** Decorative scroll-edge fade used by `ScrollFrame` and compound layouts. */
export interface ScrollFrameFadeProps extends HTMLAttributes<HTMLSpanElement> {
  axis?: ScrollFrameAxis;
  color?: string;
  edge: ScrollFrameEdge;
  size?: number | string;
}

/** Props for compound previous/next movement controls. */
export interface ScrollFrameMovementControlProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the control as the child element while preserving behavior. */
  asChild?: boolean;
  /** Axis moved by this control. Defaults to the root's control axis. */
  axis?: ScrollFrameAxis;
  /**
   * When the control is visible or enabled.
   *
   * Default inherited from the root control visibility.
   */
  visibility?: ScrollFrameControlVisibility;
}

export interface ScrollFrameContextValue {
  axes: ScrollFrameAxes;
  controlVisibility: ScrollFrameControlVisibility;
  dragScroll: ScrollFrameResolvedDragScrollConfig | null;
  edgeState: ScrollFrameEdgeState;
  isDragging: boolean;
  registerViewport: (node: HTMLDivElement | null) => void;
  scrollbars: ScrollFrameScrollbarVisibility;
  scrollBehavior: ScrollFrameScrollBehavior;
  scrollByStep: (direction: ScrollFrameEdge, axis?: ScrollFrameAxis) => void;
  scrollStep: ScrollFrameScrollStep;
  setDragging: (isDragging: boolean) => void;
  viewport: HTMLDivElement | null;
}
