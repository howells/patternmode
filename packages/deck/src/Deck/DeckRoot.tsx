"use client";

import { joinClassNames } from "@patternmode/system";
import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
  type PanInfo,
  useReducedMotion,
} from "motion/react";
import {
  type CSSProperties,
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import {
  getAdvanceDecision,
  getDeckRenderKey,
  getNextDeckIndex,
  getVisibleDeckItems,
  resolveCardRotation,
} from "../logic";
import type {
  AdvanceDirection,
  DeckAdvanceEvent,
  DeckCardElement,
  DeckRenderOverlayState,
  DeckRootProps,
} from "../types";
import { DeckCard } from "./DeckCard";
import {
  BG_RESPONSE_FACTOR,
  BG_RESPONSE_RAMP,
  DEFAULT_DIRECTIONS,
  DEFAULT_DISTANCE_THRESHOLD,
  DEFAULT_DRAG_ELASTIC,
  DEFAULT_PEEK_OFFSET,
  DEFAULT_PERSPECTIVE,
  DEFAULT_ROTATION,
  DEFAULT_SCALE_STEP,
  DEFAULT_VELOCITY_THRESHOLD,
  DEFAULT_VISIBLE_COUNT,
  DRAG_INFLUENCE_RAMP,
  DRAG_TILT_MAX,
  DRAG_TILT_RAMP,
} from "./DeckConstants";
import { DeckEmpty } from "./DeckEmpty";
import { cardExitVariants } from "./DeckMotion";
import { useDeckChildren } from "./useDeckChildren";

export const DeckRoot = forwardRef<HTMLDivElement, DeckRootProps>(
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
      onAdvance,
      onAdvanceEnd,
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
    const [visualBaseIndex, setVisualBaseIndex] = useState(defaultIndex);
    const [lastDirection, setLastDirection] = useState<AdvanceDirection | null>(
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

    const commitAdvance = useCallback(
      (direction: AdvanceDirection, velocity = 0) => {
        if (disabled || !activeCard) {
          return;
        }

        const nextIndex = getNextDeckIndex(activeIndex, cards.length, mode);
        const event: DeckAdvanceEvent = {
          direction,
          index: activeIndex,
          itemId: activeCard.id,
          mode,
          nextIndex,
        };

        setLastDirection(direction);
        setExitVelocity(velocity);
        onAdvance?.(event);

        if (!controlled) {
          setInternalIndex(nextIndex);
        }
        if (mode === "cycle") {
          setVisualBaseIndex((current) => current + 1);
        } else {
          setVisualBaseIndex(nextIndex);
        }

        onIndexChange?.(nextIndex);
        onAdvanceEnd?.(event);

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
        onAdvance,
        onAdvanceEnd,
        onIndexChange,
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
        const decision = getAdvanceDecision({
          allowedDirections,
          distanceThreshold,
          offsetX: info.offset.x,
          velocityThreshold,
          velocityX: info.velocity.x,
          width: target?.offsetWidth ?? 1,
        });

        if (decision.accepted) {
          commitAdvance(decision.direction, info.velocity.x);
        }
      },
      [allowedDirections, commitAdvance, distanceThreshold, velocityThreshold],
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || disabled) {
          return;
        }

        if (event.key === "ArrowLeft" && allowedDirections.includes("left")) {
          event.preventDefault();
          commitAdvance("left");
        }

        if (event.key === "ArrowRight" && allowedDirections.includes("right")) {
          event.preventDefault();
          commitAdvance("right");
        }
      },
      [allowedDirections, commitAdvance, disabled, onKeyDown],
    );

    const rootStyle = {
      ...style,
      "--deck-perspective": `${perspective}px`,
    } as CSSProperties;

    return (
      <div
        {...props}
        className={joinClassNames("patternmode-deck", className)}
        data-disabled={disabled ? "true" : undefined}
        data-empty={exhausted ? "true" : undefined}
        onKeyDown={handleKeyDown}
        ref={ref}
        role="application"
        style={rootStyle}
        tabIndex={tabIndex ?? 0}
      >
        <LazyMotion features={domMax}>
          <AnimatePresence custom={exitCustom} initial={false}>
            {visibleCards.map((item, depth) => {
              const active = depth === 0;
              const card = item.element as DeckCardElement;
              const cardProps = card.props;
              const absoluteVisualIndex =
                (mode === "cycle" ? visualBaseIndex : activeIndex) + depth;
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
                const promotedScale = Math.max(
                  0.7,
                  1 - (depth - 1) * scaleStep,
                );
                const promotedY = (depth - 1) * peekOffset;
                cardScale =
                  restScale +
                  (promotedScale - restScale) *
                    dragProgress *
                    BG_RESPONSE_FACTOR;
                cardY =
                  restY +
                  (promotedY - restY) * dragProgress * BG_RESPONSE_FACTOR;
              }

              return (
                <m.div
                  key={getDeckRenderKey(
                    item.id,
                    absoluteVisualIndex,
                    cards.length,
                    mode,
                  )}
                  {...cardProps}
                  aria-hidden={active ? undefined : true}
                  className={joinClassNames(
                    "patternmode-deck-card",
                    cardProps.className,
                  )}
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
                </m.div>
              );
            })}
          </AnimatePresence>
        </LazyMotion>
        {exhausted && empty ? empty : null}
      </div>
    );
  },
);

DeckRoot.displayName = "Deck";

const Deck = Object.assign(DeckRoot, {
  Card: DeckCard,
  Empty: DeckEmpty,
});

const CardStack = Deck;

export { CardStack, Deck };
