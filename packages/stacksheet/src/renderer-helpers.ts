import type { CSSProperties } from "react";
import { getSnapOffset } from "./snap-points";
import type { getStackTransform, SlideValues } from "./stacking";
import type { Side, StacksheetClassNames } from "./types";

export type ResolvedClassNames = Required<StacksheetClassNames>;

export const EMPTY_CLASSNAMES: ResolvedClassNames = {
	backdrop: "",
	panel: "",
	header: "",
};

export function resolveClassNames(
	cn?: StacksheetClassNames,
): ResolvedClassNames {
	if (!cn) {
		return EMPTY_CLASSNAMES;
	}
	return {
		backdrop: cn.backdrop ?? "",
		panel: cn.panel ?? "",
		header: cn.header ?? "",
	};
}

export function buildAriaProps(
	isTop: boolean,
	isModal: boolean,
	isComposable: boolean,
	ariaLabel: string,
	panelId: string,
	hasDescription: boolean,
): Record<string, string | undefined> {
	if (!isTop) {
		return {};
	}
	const props: Record<string, string | undefined> = { role: "dialog" };
	if (isModal) {
		props["aria-modal"] = "true";
	}
	if (isComposable) {
		props["aria-labelledby"] = `${panelId}-title`;
		if (hasDescription) {
			props["aria-describedby"] = `${panelId}-desc`;
		}
	} else {
		props["aria-label"] = ariaLabel;
	}
	return props;
}

export function getDragTransform(
	side: Side,
	offset: number,
): { x?: number; y?: number } {
	if (offset === 0) {
		return {};
	}
	switch (side) {
		case "right":
			return { x: offset };
		case "left":
			return { x: -offset };
		case "bottom":
			return { y: offset };
		default:
			return {};
	}
}

export const VISUAL_TWEEN = {
	type: "tween" as const,
	duration: 0.25,
	ease: "easeOut" as const,
};

export function buildPanelStyle(
	panelStyles: CSSProperties,
	isTop: boolean,
	hasPanelClass: boolean,
	isDragging: boolean,
): CSSProperties {
	return {
		...panelStyles,
		pointerEvents: isTop ? "auto" : "none",
		...(isTop ? {} : { contain: "layout style paint" }),
		...(isDragging ? { transition: "none" } : {}),
		...(hasPanelClass
			? {}
			: {
					background: "var(--background, #fff)",
					borderColor: "var(--border, transparent)",
				}),
	};
}

export function buildPanelTransition(
	isDragging: boolean,
	isTop: boolean,
	spring: Record<string, unknown>,
	stackSpring: Record<string, unknown>,
) {
	if (isDragging) {
		return { type: "tween" as const, duration: 0 };
	}

	const base = isTop ? spring : stackSpring;
	return { ...base, borderRadius: VISUAL_TWEEN, boxShadow: VISUAL_TWEEN };
}

export function computeSnapYOffset(
	side: Side,
	snapHeights: number[],
	activeSnapIndex: number,
	measuredHeight: number,
): number {
	if (side !== "bottom" || snapHeights.length === 0 || measuredHeight <= 0) {
		return 0;
	}
	return getSnapOffset(activeSnapIndex, snapHeights, measuredHeight);
}

export function getBottomSlideDistance(measuredHeight: number): number {
	if (measuredHeight > 0) {
		return measuredHeight;
	}
	if (typeof window !== "undefined") {
		return window.innerHeight;
	}
	return 1000;
}

export function resolveSlideFrom(
	side: Side,
	slideFrom: SlideValues,
	measuredHeight: number,
): SlideValues {
	if (side !== "bottom") {
		return slideFrom;
	}
	return { y: getBottomSlideDistance(measuredHeight) };
}

export function buildAnimateTarget(
	slideTarget: SlideValues,
	stackOffset: { x?: number; y?: number },
	dragOffset: { x?: number; y?: number },
	transform: ReturnType<typeof getStackTransform>,
	animatedRadius: Record<string, number>,
	transition: Record<string, unknown>,
	snapYOffset: number,
	isTop: boolean,
) {
	const base = {
		...slideTarget,
		...stackOffset,
		...dragOffset,
		scale: transform.scale,
		opacity: transform.opacity,
		...animatedRadius,
		boxShadow: getShadow(!isTop),
		transition,
	};

	if (snapYOffset > 0) {
		return { ...base, y: (dragOffset.y ?? 0) + snapYOffset };
	}
	return base;
}

export function getInitialRadius(side: Side): Record<string, number> {
	if (side === "bottom") {
		return {
			borderTopLeftRadius: 0,
			borderTopRightRadius: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
		};
	}
	return { borderRadius: 0 };
}

const SHADOW_SM =
	"0px 1px 3px 0px rgba(0,0,0,0.06), 0px 6px 12px 0px rgba(0,0,0,0.06)";
const SHADOW_LG =
	"0px 8px 24px 0px rgba(0,0,0,0.06), 0px 24px 48px 0px rgba(0,0,0,0.04), 0px 48px 96px 0px rgba(0,0,0,0.03)";

export function getShadow(isNested: boolean): string {
	return isNested ? SHADOW_SM : SHADOW_LG;
}
