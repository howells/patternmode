"use client";

import {
	AnimatePresence,
	motion,
	type PanInfo,
	useReducedMotion,
} from "motion/react";
import {
	Children,
	type CSSProperties,
	forwardRef,
	isValidElement,
	type ReactNode,
	useCallback,
	useId,
	useMemo,
	useState,
} from "react";

import {
	getNextDeckIndex,
	getSwipeDecision,
	getVisibleDeckItems,
	resolveCardRotation,
} from "./logic";
import type {
	DeckCardElement,
	DeckCardProps,
	DeckEmptyElement,
	DeckEmptyProps,
	DeckRenderOverlayState,
	DeckRootProps,
	DeckSwipeEvent,
	SwipeDirection,
} from "./types";

const DEFAULT_VISIBLE_COUNT = 3;
const DEFAULT_DISTANCE_THRESHOLD = 0.35;
const DEFAULT_VELOCITY_THRESHOLD = 500;
const DEFAULT_PEEK_OFFSET = 16;
const DEFAULT_SCALE_STEP = 0.045;
const DEFAULT_ROTATION = 6;
const DEFAULT_PERSPECTIVE = 1000;
const DEFAULT_DRAG_ELASTIC = 0.9;
const DEFAULT_DIRECTIONS: SwipeDirection[] = ["left", "right"];

const DRAG_TILT_MAX = 15;
const DRAG_TILT_RAMP = 250;
const DRAG_INFLUENCE_RAMP = 80;
const EXIT_ROTATION = 20;
const BG_RESPONSE_FACTOR = 0.4;
const BG_RESPONSE_RAMP = 150;

const cardExitVariants = {
	exit: (custom: { velocity: number; direction: SwipeDirection | null }) => {
		const speed = Math.abs(custom?.velocity ?? 0);
		const dir = custom?.direction;
		return {
			opacity: 0,
			rotate: dir === "left" ? -EXIT_ROTATION : EXIT_ROTATION,
			scale: 0.96,
			x: dir === "left" ? "-120%" : "120%",
			transition: {
				type: "spring" as const,
				stiffness: speed > 600 ? 280 : 180,
				damping: speed > 600 ? 32 : 25,
				opacity: { duration: 0.15, ease: "easeIn" as const },
			},
		};
	},
};

const DeckRoot = forwardRef<HTMLDivElement, DeckRootProps>(
	(
		{
			allowedDirections = DEFAULT_DIRECTIONS,
			children,
			className,
			defaultIndex = 0,
			disabled = false,
			distanceThreshold = DEFAULT_DISTANCE_THRESHOLD,
			dragElastic = DEFAULT_DRAG_ELASTIC,
			index,
			mode = "cycle",
			onExhausted,
			onIndexChange,
			onKeyDown,
			onSwipe,
			onSwipeEnd,
			peekOffset = DEFAULT_PEEK_OFFSET,
			perspective = DEFAULT_PERSPECTIVE,
			renderOverlay,
			rotation = DEFAULT_ROTATION,
			scaleStep = DEFAULT_SCALE_STEP,
			style,
			tabIndex,
			velocityThreshold = DEFAULT_VELOCITY_THRESHOLD,
			visibleCount = DEFAULT_VISIBLE_COUNT,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const [internalIndex, setInternalIndex] = useState(defaultIndex);
		const [lastDirection, setLastDirection] = useState<SwipeDirection | null>(
			null,
		);
		const [dragOffset, setDragOffset] = useState(0);
		const [exitVelocity, setExitVelocity] = useState(0);
		const reduceMotion = useReducedMotion();
		const controlled = index !== undefined;
		const activeIndex = controlled ? index : internalIndex;
		const { cards, empty } = useDeckChildren(children, generatedId);
		const visibleCards = useMemo(
			() => getVisibleDeckItems(cards, activeIndex, visibleCount, mode),
			[cards, activeIndex, visibleCount, mode],
		);
		const activeCard = visibleCards[0];
		const exhausted = mode === "finite" && visibleCards.length === 0;

		const isDragging = dragOffset !== 0;
		const dragProgress = Math.min(1, Math.abs(dragOffset) / BG_RESPONSE_RAMP);

		const exitCustom = useMemo(
			() => ({ velocity: exitVelocity, direction: lastDirection }),
			[exitVelocity, lastDirection],
		);

		const commitSwipe = useCallback(
			(direction: SwipeDirection, velocity = 0) => {
				if (disabled || !activeCard) {
					return;
				}

				const nextIndex = getNextDeckIndex(activeIndex, cards.length, mode);
				const event: DeckSwipeEvent = {
					direction,
					index: activeIndex,
					itemId: activeCard.id,
					mode,
					nextIndex,
				};

				setLastDirection(direction);
				setExitVelocity(velocity);
				onSwipe?.(event);

				if (!controlled) {
					setInternalIndex(nextIndex);
				}

				onIndexChange?.(nextIndex);
				onSwipeEnd?.(event);

				if (mode === "finite" && nextIndex >= cards.length) {
					onExhausted?.();
				}
			},
			[
				activeCard,
				activeIndex,
				cards.length,
				controlled,
				disabled,
				mode,
				onExhausted,
				onIndexChange,
				onSwipe,
				onSwipeEnd,
			],
		);

		const handleDrag = useCallback(
			(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
				setDragOffset(info.offset.x);
			},
			[],
		);

		const handleDragEnd = useCallback(
			(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
				setDragOffset(0);

				const target = event.currentTarget as HTMLElement | null;
				const decision = getSwipeDecision({
					allowedDirections,
					distanceThreshold,
					offsetX: info.offset.x,
					velocityThreshold,
					velocityX: info.velocity.x,
					width: target?.offsetWidth ?? 1,
				});

				if (decision.accepted) {
					commitSwipe(decision.direction, info.velocity.x);
				}
			},
			[allowedDirections, commitSwipe, distanceThreshold, velocityThreshold],
		);

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				onKeyDown?.(event);

				if (event.defaultPrevented || disabled) {
					return;
				}

				if (event.key === "ArrowLeft" && allowedDirections.includes("left")) {
					event.preventDefault();
					commitSwipe("left");
				}

				if (event.key === "ArrowRight" && allowedDirections.includes("right")) {
					event.preventDefault();
					commitSwipe("right");
				}
			},
			[allowedDirections, commitSwipe, disabled, onKeyDown],
		);

		const rootStyle = {
			...style,
			"--deck-perspective": `${perspective}px`,
		} as CSSProperties;

		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: the root owns arrow-key swipe affordances for the active card.
			<div
				{...props}
				className={["howells-deck", className].filter(Boolean).join(" ")}
				data-disabled={disabled ? "true" : undefined}
				data-empty={exhausted ? "true" : undefined}
				onKeyDown={handleKeyDown}
				ref={ref}
				role={props.role ?? "group"}
				style={rootStyle}
				tabIndex={tabIndex ?? 0}
			>
				<AnimatePresence custom={exitCustom} initial={false}>
					{visibleCards.map((item, depth) => {
						const active = depth === 0;
						const card = item.element as DeckCardElement;
						const cardProps = card.props;
						const cardStyle = {
							...cardProps.style,
							"--deck-depth": depth,
						} as CSSProperties;
						const overlayState: DeckRenderOverlayState = {
							active,
							depth,
							direction: lastDirection,
							index: activeIndex + depth,
							itemId: item.id,
						};

						const idleRotate = reduceMotion
							? 0
							: resolveCardRotation(item.id, rotation);

						let cardRotate = idleRotate;
						if (active && isDragging && !reduceMotion) {
							const influence = Math.min(
								1,
								Math.abs(dragOffset) / DRAG_INFLUENCE_RAMP,
							);
							const tilt = (dragOffset / DRAG_TILT_RAMP) * DRAG_TILT_MAX;
							cardRotate = Number(
								(idleRotate * (1 - influence) + tilt).toFixed(3),
							);
						}

						const restScale = reduceMotion
							? 1
							: Math.max(0.7, 1 - depth * scaleStep);
						const restY = reduceMotion ? 0 : depth * peekOffset;

						let cardScale = restScale;
						let cardY = restY;

						if (!active && isDragging && !reduceMotion) {
							const promotedScale = Math.max(0.7, 1 - (depth - 1) * scaleStep);
							const promotedY = (depth - 1) * peekOffset;
							cardScale =
								restScale +
								(promotedScale - restScale) * dragProgress * BG_RESPONSE_FACTOR;
							cardY =
								restY + (promotedY - restY) * dragProgress * BG_RESPONSE_FACTOR;
						}

						return (
							<motion.div
								{...cardProps}
								aria-hidden={active ? undefined : true}
								className={["howells-deck-card", cardProps.className]
									.filter(Boolean)
									.join(" ")}
								custom={exitCustom}
								data-active={active ? "true" : "false"}
								data-depth={depth}
								data-direction={lastDirection ?? undefined}
								drag={active && !disabled ? "x" : false}
								dragConstraints={{ left: 0, right: 0 }}
								dragElastic={dragElastic}
								dragMomentum={true}
								dragTransition={{
									bounceStiffness: 300,
									bounceDamping: 22,
									power: 0.3,
									timeConstant: 350,
								}}
								initial={false}
								key={item.id}
								onDrag={active && !disabled ? handleDrag : undefined}
								onDragEnd={active && !disabled ? handleDragEnd : undefined}
								style={cardStyle}
								variants={cardExitVariants}
								exit="exit"
								transition={{
									rotate:
										isDragging && active
											? { duration: 0 }
											: {
													type: "spring",
													stiffness: 400,
													damping: 25,
												},
									scale: {
										type: "spring",
										stiffness: 350,
										damping: 28,
									},
									y: { type: "spring", stiffness: 300, damping: 28 },
									opacity: { duration: 0.2, ease: "easeOut" },
									default: {
										type: "spring",
										stiffness: 320,
										damping: 28,
									},
								}}
								animate={{
									opacity: 1,
									rotate: cardRotate,
									scale: active ? 1 : cardScale,
									y: active ? 0 : cardY,
									zIndex: visibleCards.length - depth,
								}}
								whileDrag={
									active && !disabled
										? {
												cursor: "grabbing",
												scale: reduceMotion ? 1 : 1.02,
											}
										: undefined
								}
							>
								{cardProps.children}
								{renderOverlay?.(overlayState)}
							</motion.div>
						);
					})}
				</AnimatePresence>
				{exhausted && empty ? empty : null}
			</div>
		);
	},
);

DeckRoot.displayName = "Deck";

function DeckCard(_props: DeckCardProps) {
	return null;
}

DeckCard.displayName = "Deck.Card";

const DeckEmpty = forwardRef<HTMLDivElement, DeckEmptyProps>(
	({ children, className, ...props }, ref) => (
		<div
			{...props}
			className={["howells-deck-empty", className].filter(Boolean).join(" ")}
			ref={ref}
		>
			{children}
		</div>
	),
);

DeckEmpty.displayName = "Deck.Empty";

function useDeckChildren(children: ReactNode, generatedId: string) {
	return useMemo(() => {
		const cards: DeckItemWithElement[] = [];
		let empty: DeckEmptyElement | null = null;

		Children.forEach(children, (child, childIndex) => {
			if (!isValidElement(child)) {
				return;
			}

			if (child.type === DeckCard) {
				const card = child as DeckCardElement;
				const id =
					child.key === null
						? `${generatedId}-${childIndex}`
						: String(child.key).replace(/^\.\$/, "");
				cards.push({ id, element: card });
				return;
			}

			if (child.type === DeckEmpty) {
				empty = child as DeckEmptyElement;
			}
		});

		return { cards, empty };
	}, [children, generatedId]);
}

interface DeckItemWithElement {
	element: DeckCardElement;
	id: string;
}

const Deck = Object.assign(DeckRoot, {
	Card: DeckCard,
	Empty: DeckEmpty,
});

const CardStack = Deck;

export { CardStack, Deck, DeckCard, DeckEmpty, DeckRoot };
