import {
	motion,
	type TargetAndTransition,
	type Transition,
} from "motion/react";
import { useEffect } from "react";
import { useApertoContext } from "./context";
import { renderTransitionMedia } from "./media-rendering";
import type { ApertoMediaItem } from "./types";

export interface ApertoRect {
	height: number;
	left: number;
	top: number;
	width: number;
}

export interface ApertoMediaTransition {
	from: ApertoRect;
	item: ApertoMediaItem;
	phase: "opening" | "closing";
	to?: ApertoRect;
}

export function rectFromElement(element: Element | null): ApertoRect | null {
	if (!element) {
		return null;
	}

	const rect = element.getBoundingClientRect();
	return {
		height: rect.height,
		left: rect.left,
		top: rect.top,
		width: rect.width,
	};
}

function rectTarget(rect: ApertoRect): TargetAndTransition {
	return {
		height: rect.height,
		left: rect.left,
		top: rect.top,
		width: rect.width,
	};
}

function transitionDurationMs(transition: Transition): number {
	return typeof transition.duration === "number"
		? transition.duration * 1000
		: 450;
}

export function ApertoMediaTransitionClone({
	onComplete,
	transition,
}: {
	onComplete: () => void;
	transition: ApertoMediaTransition | null;
}) {
	const ctx = useApertoContext();

	useEffect(() => {
		if (!transition?.to) {
			return;
		}

		const timer = setTimeout(
			onComplete,
			transitionDurationMs(ctx.preset.transition),
		);
		return () => clearTimeout(timer);
	}, [ctx.preset.transition, onComplete, transition]);

	if (!transition?.to) {
		return null;
	}

	return (
		<motion.div
			animate={rectTarget(transition.to)}
			data-slot="aperto-transition-media"
			initial={rectTarget(transition.from)}
			style={{
				borderRadius: "var(--aperto-radius, 0.5rem)",
				overflow: "hidden",
				pointerEvents: "none",
				position: "fixed",
				willChange: "left, top, width, height",
				zIndex: 1002,
			}}
			transition={ctx.preset.transition}
		>
			{renderTransitionMedia(transition.item)}
		</motion.div>
	);
}
