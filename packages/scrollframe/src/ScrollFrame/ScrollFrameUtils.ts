import type * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { ComponentPropsWithoutRef, Ref } from "react";

import type {
	ScrollFrameAxes,
	ScrollFrameAxis,
	ScrollFrameAxisState,
	ScrollFrameDragScrollConfig,
	ScrollFrameEdge,
	ScrollFrameFadeConfig,
	ScrollFrameFadeEdges,
	ScrollFrameResolvedDragScrollConfig,
	ScrollFrameScrollbarVisibility,
} from "./ScrollFrameTypes";

const DEFAULT_DRAG_SCROLL_IGNORE_SELECTOR =
	"input, textarea, select, option, [contenteditable], [data-scrollframe-no-drag]";
const DEFAULT_DRAG_SCROLL_ACTIVATION_DISTANCE = 8;

export function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
	if (!ref) {
		return;
	}
	if (typeof ref === "function") {
		ref(value);
		return;
	}
	ref.current = value;
}

export function resolveRadixType(
	scrollbars: ScrollFrameScrollbarVisibility,
): ComponentPropsWithoutRef<typeof RadixScrollArea.Root>["type"] {
	if (scrollbars === "hidden") {
		return "always";
	}
	return scrollbars === "auto" ? "scroll" : scrollbars;
}

export function supportsAxis(
	axes: ScrollFrameAxes,
	axis: ScrollFrameAxis,
): boolean {
	return axes === "both" || axes === axis;
}

export function defaultControlAxis(axes: ScrollFrameAxes): ScrollFrameAxis {
	return axes === "horizontal" ? "horizontal" : "vertical";
}

export function resolveDragScrollConfig(
	dragScroll: boolean | ScrollFrameDragScrollConfig | undefined,
): ScrollFrameResolvedDragScrollConfig | null {
	if (!dragScroll) {
		return null;
	}

	const config = typeof dragScroll === "object" ? dragScroll : {};
	return {
		activationDistance:
			config.activationDistance ?? DEFAULT_DRAG_SCROLL_ACTIVATION_DISTANCE,
		axis: config.axis ?? "auto",
		cursor: config.cursor ?? true,
		ignoreSelector:
			config.ignoreSelector ?? DEFAULT_DRAG_SCROLL_IGNORE_SELECTOR,
	};
}

export function isDragScrollIgnored(
	target: EventTarget | null,
	ignoreSelector: string,
): boolean {
	if (!(target instanceof Element)) {
		return true;
	}
	if ((target as HTMLElement).isContentEditable) {
		return true;
	}
	return Boolean(target.closest(ignoreSelector));
}

export function shouldRenderFade(
	fades: ScrollFrameFadeConfig | undefined,
	axis: ScrollFrameAxis,
	edge: ScrollFrameEdge,
): boolean {
	if (fades === false || fades === "none") {
		return false;
	}
	if (fades && typeof fades === "object") {
		const axisEdges = normalizeFadeEdges(fades[axis]);
		return axisEdges === "both" || axisEdges === edge;
	}
	const edges = normalizeFadeEdges(fades);
	return edges === "both" || edges === edge;
}

export function getAxisState(
	node: HTMLDivElement,
	axis: ScrollFrameAxis,
): ScrollFrameAxisState {
	const max =
		axis === "vertical"
			? node.scrollHeight - node.clientHeight
			: node.scrollWidth - node.clientWidth;
	const position = axis === "vertical" ? node.scrollTop : node.scrollLeft;
	const scrollable = max > 1;
	return {
		atStart: position <= 1,
		atEnd: !scrollable || position >= max - 1,
		scrollable,
	};
}

export function getReducedMotionPreference(): boolean {
	if (typeof window === "undefined" || !window.matchMedia) {
		return false;
	}
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getPageStep(
	node: HTMLDivElement,
	axis: ScrollFrameAxis,
): number {
	const size = axis === "vertical" ? node.clientHeight : node.clientWidth;
	return Math.max(1, size * 0.85);
}

function normalizeFadeEdges(
	fadeEdges: ScrollFrameFadeEdges | undefined,
): "none" | "start" | "end" | "both" {
	if (fadeEdges === undefined || fadeEdges === true) {
		return "both";
	}
	if (fadeEdges === false) {
		return "none";
	}
	return fadeEdges;
}
