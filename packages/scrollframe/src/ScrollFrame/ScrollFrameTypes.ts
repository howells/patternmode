import type * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type {
	ButtonHTMLAttributes,
	ComponentPropsWithoutRef,
	CSSProperties,
	HTMLAttributes,
	ReactNode,
	Ref,
} from "react";

export const SCROLL_FRAME_AXES = ["vertical", "horizontal", "both"] as const;
export const SCROLL_FRAME_EDGES = ["start", "end"] as const;
export const SCROLL_FRAME_SCROLLBARS = [
	"auto",
	"always",
	"hover",
	"hidden",
] as const;
export const SCROLL_FRAME_CONTROL_VISIBILITY = [
	"auto",
	"disabled",
	"hidden",
] as const;

export type ScrollFrameAxis = "vertical" | "horizontal";
export type ScrollFrameAxes = (typeof SCROLL_FRAME_AXES)[number];
export type ScrollFrameEdge = (typeof SCROLL_FRAME_EDGES)[number];
export type ScrollFrameScrollbarVisibility =
	(typeof SCROLL_FRAME_SCROLLBARS)[number];
export type ScrollFrameControlVisibility =
	(typeof SCROLL_FRAME_CONTROL_VISIBILITY)[number];
export type ScrollFrameFadeEdges = "none" | "start" | "end" | "both" | boolean;
export type ScrollFrameFadeConfig =
	| ScrollFrameFadeEdges
	| Partial<Record<ScrollFrameAxis, ScrollFrameFadeEdges>>;
export type ScrollFrameScrollStep =
	| "page"
	| number
	| ((state: ScrollFrameContextValue, axis: ScrollFrameAxis) => number);
export type ScrollFrameScrollBehavior = ScrollBehavior;

export interface ScrollFrameAxisState {
	atEnd: boolean;
	atStart: boolean;
	scrollable: boolean;
}

export interface ScrollFrameEdgeState {
	horizontal: ScrollFrameAxisState;
	vertical: ScrollFrameAxisState;
}

export interface ScrollFrameControlsConfig {
	axis?: ScrollFrameAxis;
	visibility?: ScrollFrameControlVisibility;
}

export interface ScrollFrameProps
	extends Omit<ComponentPropsWithoutRef<typeof RadixScrollArea.Root>, "type"> {
	axes?: ScrollFrameAxes;
	children: ReactNode;
	contentClassName?: string;
	contentStyle?: CSSProperties;
	controls?: boolean | ScrollFrameControlsConfig;
	controlVisibility?: ScrollFrameControlVisibility;
	fadeColor?: string;
	fadeSize?: number | string;
	fades?: ScrollFrameFadeConfig;
	scrollbars?: ScrollFrameScrollbarVisibility;
	scrollBehavior?: ScrollFrameScrollBehavior;
	scrollStep?: ScrollFrameScrollStep;
	viewportClassName?: string;
	viewportRef?: Ref<HTMLDivElement>;
	viewportStyle?: CSSProperties;
}

export interface ScrollFrameRootProps
	extends Omit<ComponentPropsWithoutRef<typeof RadixScrollArea.Root>, "type"> {
	axes?: ScrollFrameAxes;
	children: ReactNode;
	controlVisibility?: ScrollFrameControlVisibility;
	fadeColor?: string;
	fadeSize?: number | string;
	scrollbars?: ScrollFrameScrollbarVisibility;
	scrollBehavior?: ScrollFrameScrollBehavior;
	scrollStep?: ScrollFrameScrollStep;
}

export interface ScrollFrameViewportProps
	extends ComponentPropsWithoutRef<typeof RadixScrollArea.Viewport> {
	children: ReactNode;
	contentClassName?: string;
	contentStyle?: CSSProperties;
	viewportRef?: Ref<HTMLDivElement>;
}

export interface ScrollFrameFadeProps extends HTMLAttributes<HTMLSpanElement> {
	axis?: ScrollFrameAxis;
	color?: string;
	edge: ScrollFrameEdge;
	size?: number | string;
}

export interface ScrollFrameMovementControlProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	axis?: ScrollFrameAxis;
	visibility?: ScrollFrameControlVisibility;
}

export interface ScrollFrameContextValue {
	axes: ScrollFrameAxes;
	controlVisibility: ScrollFrameControlVisibility;
	edgeState: ScrollFrameEdgeState;
	registerViewport: (node: HTMLDivElement | null) => void;
	scrollbars: ScrollFrameScrollbarVisibility;
	scrollBehavior: ScrollFrameScrollBehavior;
	scrollByStep: (direction: ScrollFrameEdge, axis?: ScrollFrameAxis) => void;
	scrollStep: ScrollFrameScrollStep;
	viewport: HTMLDivElement | null;
}
