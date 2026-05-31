import { type RefObject, useCallback, useEffect, useRef } from "react";
import { findSnapTarget } from "../snap-points";
import { DEAD_ZONE, RUBBER_BAND_FACTOR } from "./DragConstants";
import {
	commitGesture,
	findScrollableAncestor,
	getDismissAxis,
	getPanelDimension,
	isInteractiveElement,
} from "./DragGeometry";
import type { DragConfig, DragState } from "./DragTypes";

/**
 * Hook that manages drag gestures that can dismiss a sheet panel.
 *
 * Gesture pipeline:
 * 1. Dead zone (10px) — ignores micro-movements
 * 2. Angle check (35°) — must be roughly aligned with dismiss axis
 * 3. Scroll conflict — yields to scrollable containers not at edge
 * 4. Commit — drag is active, applies offset via `onDragUpdate`
 * 5. Release — velocity + threshold determine close/snap/bounce-back
 *
 * Opposite-direction drag uses √(offset) damping for elastic
 * rubber-band resistance (same physics as iOS over-scroll).
 *
 * When `snapHeights` is provided, release targeting uses
 * `findSnapTarget()` instead of the simple threshold check.
 */
export function useDrag(
	panelRef: RefObject<HTMLDivElement | null>,
	config: DragConfig,
	onDragUpdate: (state: DragState) => void,
) {
	const startRef = useRef<{ x: number; y: number; time: number } | null>(null);
	const committedRef = useRef<"drag" | "none" | null>(null);
	const offsetRef = useRef(0);
	const scrollTargetRef = useRef<Element | null>(null);

	const { axis, sign } = getDismissAxis(config.side);

	const handlePointerDown = useCallback(
		(e: PointerEvent) => {
			if (!config.enabled) {
				return;
			}
			// Only primary button
			if (e.button !== 0) {
				return;
			}
			// Check target element
			const target = e.target as Element;
			if (!target) {
				return;
			}

			// Allow drag from handle elements always
			const isHandle = !!target.closest("[data-stacksheet-handle]");

			// For non-handle areas, check if the target is interactive
			if (!isHandle && isInteractiveElement(target)) {
				return;
			}

			// Track nearest scrollable ancestor — checked at commit time
			scrollTargetRef.current = isHandle
				? null
				: findScrollableAncestor(target, axis);

			startRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
			committedRef.current = null;
			offsetRef.current = 0;

			// Capture pointer for reliable move/up outside the element
			(e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
		},
		[config.enabled, axis],
	);

	const handlePointerMove = useCallback(
		(e: PointerEvent) => {
			if (!startRef.current) {
				return;
			}

			const dx = e.clientX - startRef.current.x;
			const dy = e.clientY - startRef.current.y;
			const dist = Math.sqrt(dx * dx + dy * dy);

			// Still in dead zone — don't commit yet
			if (committedRef.current === null && dist < DEAD_ZONE) {
				return;
			}

			// Commit decision: check direction + scroll state
			if (committedRef.current === null) {
				committedRef.current = commitGesture(
					dx,
					dy,
					axis,
					sign,
					scrollTargetRef.current,
				);
				if (committedRef.current !== "drag") {
					startRef.current = null;
					return;
				}
			}

			if (committedRef.current !== "drag") {
				return;
			}

			// Calculate offset in dismiss direction
			const rawOffset = axis === "x" ? dx : dy;
			const directional = rawOffset * sign;

			// Dismiss direction: linear movement. Opposite direction: √ damping
			// for elastic rubber-band resistance (same math as iOS over-scroll).
			const clampedOffset =
				directional >= 0
					? directional
					: -Math.sqrt(Math.abs(directional)) * RUBBER_BAND_FACTOR;

			offsetRef.current = clampedOffset;
			onDragUpdate({ offset: clampedOffset, isDragging: true });

			// Prevent text selection during active drag
			e.preventDefault();
		},
		[axis, sign, onDragUpdate],
	);

	const dismiss = useCallback(() => {
		if (config.isNested) {
			config.onPop();
		} else {
			config.onClose();
		}
	}, [config]);

	const handlePointerUp = useCallback(
		(_e: PointerEvent) => {
			if (!startRef.current || committedRef.current !== "drag") {
				startRef.current = null;
				committedRef.current = null;
				scrollTargetRef.current = null;
				return;
			}

			const offset = Math.max(0, offsetRef.current);
			const elapsed = Date.now() - startRef.current.time;
			const velocity = elapsed > 0 ? offset / elapsed : 0;

			startRef.current = null;
			committedRef.current = null;
			offsetRef.current = 0;
			scrollTargetRef.current = null;

			const panelSize = getPanelDimension(panelRef.current, axis);

			// Snap points mode
			if (config.snapHeights.length > 0) {
				const targetIndex = findSnapTarget(
					offset,
					panelSize,
					config.snapHeights,
					velocity,
					config.activeSnapIndex,
					config.sequential,
				);
				if (targetIndex === -1) {
					dismiss();
				} else {
					config.onSnap(targetIndex);
					onDragUpdate({ offset: 0, isDragging: false });
				}
				return;
			}

			// Standard mode: threshold-based close
			const pastThreshold = offset / panelSize > config.closeThreshold;
			const fastEnough = velocity > config.velocityThreshold;
			if (pastThreshold || fastEnough) {
				dismiss();
			} else {
				onDragUpdate({ offset: 0, isDragging: false });
			}
		},
		[panelRef, axis, config, onDragUpdate, dismiss],
	);

	const handlePointerCancel = useCallback(() => {
		startRef.current = null;
		committedRef.current = null;
		offsetRef.current = 0;
		scrollTargetRef.current = null;
		onDragUpdate({ offset: 0, isDragging: false });
	}, [onDragUpdate]);
	const handlersRef = useRef({
		handlePointerCancel,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
	});
	handlersRef.current = {
		handlePointerCancel,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
	};

	// Attach pointer events to the panel element
	useEffect(() => {
		const el = panelRef.current;
		if (!(el && config.enabled)) {
			return;
		}
		const onPointerDown = (event: PointerEvent) =>
			handlersRef.current.handlePointerDown(event);
		const onPointerMove = (event: PointerEvent) =>
			handlersRef.current.handlePointerMove(event);
		const onPointerUp = (event: PointerEvent) =>
			handlersRef.current.handlePointerUp(event);
		const onPointerCancel = () => handlersRef.current.handlePointerCancel();

		el.addEventListener("pointerdown", onPointerDown);
		el.addEventListener("pointermove", onPointerMove);
		el.addEventListener("pointerup", onPointerUp);
		el.addEventListener("pointercancel", onPointerCancel);

		return () => {
			el.removeEventListener("pointerdown", onPointerDown);
			el.removeEventListener("pointermove", onPointerMove);
			el.removeEventListener("pointerup", onPointerUp);
			el.removeEventListener("pointercancel", onPointerCancel);
		};
	}, [panelRef, config.enabled]);
}
