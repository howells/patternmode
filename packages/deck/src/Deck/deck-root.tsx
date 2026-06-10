"use client";

import { joinClassNames } from "@patternmode/system";
import { AnimatePresence, domMax, LazyMotion, m, useReducedMotion } from "motion/react";
import type { PanInfo } from "motion/react";
import { useId, useReducer } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

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
  DeckItem,
  DeckMode,
  DeckRenderOverlayState,
  DeckRootProps,
} from "../types";
import { DeckCard } from "./deck-card";
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
} from "./deck-constants";
import { DeckEmpty } from "./deck-empty";
import { cardExitVariants } from "./deck-motion";
import { useDeckChildren } from "./use-deck-children";

interface DeckRenderedCardProps {
  activeIndex: number;
  depth: number;
  disabled: boolean;
  dragElastic: number;
  dragOffset: number;
  dragProgress: number;
  exitCustom: { direction: AdvanceDirection | null; velocity: number };
  handleDrag: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isDragging: boolean;
  item: DeckItem;
  lastDirection: AdvanceDirection | null;
  peekOffset: number;
  reduceMotion: boolean;
  renderOverlay: DeckRootProps["renderOverlay"];
  rotation: number;
  scaleStep: number;
  visibleCount: number;
}

interface DeckRenderedCardsProps {
  activeIndex: number;
  cardsLength: number;
  disabled: boolean;
  dragElastic: number;
  dragOffset: number;
  dragProgress: number;
  exitCustom: { direction: AdvanceDirection | null; velocity: number };
  handleDrag: (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  isDragging: boolean;
  lastDirection: AdvanceDirection | null;
  mode: DeckMode;
  peekOffset: number;
  reduceMotion: boolean;
  renderOverlay: DeckRootProps["renderOverlay"];
  rotation: number;
  scaleStep: number;
  visibleCards: DeckItem[];
  visualBaseIndex: number;
}

interface DeckState {
  dragOffset: number;
  exitVelocity: number;
  internalIndex: number;
  lastDirection: AdvanceDirection | null;
  visualBaseIndex: number;
}

type DeckAction =
  | {
      type: "advance";
      controlled: boolean;
      direction: AdvanceDirection;
      mode: DeckMode;
      nextIndex: number;
      velocity: number;
    }
  | {
      type: "drag";
      offset: number;
    }
  | {
      type: "reset-drag";
    };

type DeckDispatch = (action: DeckAction) => void;

const getAbsoluteVisualIndex = (
  mode: DeckMode,
  visualBaseIndex: number,
  activeIndex: number,
  depth: number,
) => (mode === "cycle" ? visualBaseIndex : activeIndex) + depth;

const withDefault = <T,>(value: T | undefined, fallback: T): T => value ?? fallback;

const getCardRotationValue = (
  active: boolean,
  isDragging: boolean,
  reduceMotion: boolean,
  dragOffset: number,
  idleRotate: number,
) => {
  if (!active || !isDragging || reduceMotion) {
    return idleRotate;
  }

  const influence = Math.min(1, Math.abs(dragOffset) / DRAG_INFLUENCE_RAMP);
  const tilt = (dragOffset / DRAG_TILT_RAMP) * DRAG_TILT_MAX;

  return Number((idleRotate * (1 - influence) + tilt).toFixed(3));
};

const getCardDepthMotion = (
  active: boolean,
  isDragging: boolean,
  reduceMotion: boolean,
  depth: number,
  dragProgress: number,
  peekOffset: number,
  scaleStep: number,
) => {
  const restScale = reduceMotion ? 1 : Math.max(0.7, 1 - depth * scaleStep);
  const restY = reduceMotion ? 0 : depth * peekOffset;

  if (active || !isDragging || reduceMotion) {
    return { scale: restScale, y: restY };
  }

  const promotedScale = Math.max(0.7, 1 - (depth - 1) * scaleStep);
  const promotedY = (depth - 1) * peekOffset;

  return {
    scale: restScale + (promotedScale - restScale) * dragProgress * BG_RESPONSE_FACTOR,
    y: restY + (promotedY - restY) * dragProgress * BG_RESPONSE_FACTOR,
  };
};

const getRotateTransition = (active: boolean, isDragging: boolean) => {
  if (isDragging && active) {
    return { duration: 0 };
  }

  return {
    damping: 25,
    stiffness: 400,
    type: "spring" as const,
  };
};

const getWhileDrag = (draggable: boolean, reduceMotion: boolean) =>
  draggable
    ? {
        cursor: "grabbing",
        scale: reduceMotion ? 1 : 1.02,
      }
    : undefined;

const createDeckState = (defaultIndex: number): DeckState => ({
  dragOffset: 0,
  exitVelocity: 0,
  internalIndex: defaultIndex,
  lastDirection: null,
  visualBaseIndex: defaultIndex,
});

const deckReducer = (state: DeckState, action: DeckAction): DeckState => {
  if (action.type === "drag") {
    return { ...state, dragOffset: action.offset };
  }

  if (action.type === "reset-drag") {
    return { ...state, dragOffset: 0 };
  }

  return {
    ...state,
    dragOffset: 0,
    exitVelocity: action.velocity,
    internalIndex: action.controlled ? state.internalIndex : action.nextIndex,
    lastDirection: action.direction,
    visualBaseIndex: action.mode === "cycle" ? state.visualBaseIndex + 1 : action.nextIndex,
  };
};

const getDeckControlProps = ({
  ariaLabel,
  ariaLabelledBy,
  activeIndex,
  itemId,
  total,
}: {
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  activeIndex: number;
  itemId: string | undefined;
  total: number;
}) => {
  const valueMax = Math.max(total - 1, 0);
  const valueNow = Math.min(Math.max(activeIndex, 0), valueMax);

  return {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-valuetext": itemId ?? "No cards",
    max: valueMax,
    min: 0,
    readOnly: true,
    type: "range" as const,
    value: valueNow,
  };
};

const getDeckRootDataProps = (disabled: boolean, exhausted: boolean) => ({
  "data-disabled": disabled ? "true" : undefined,
  "data-empty": exhausted ? "true" : undefined,
});

const useDeckInteractions = ({
  activeCard,
  activeIndex,
  allowedDirections,
  cards,
  controlled,
  disabled,
  dispatch,
  distanceThreshold,
  mode,
  onAdvance,
  onAdvanceEnd,
  onExhausted,
  onIndexChange,
  onKeyDown,
  velocityThreshold,
}: {
  activeCard: DeckItem | undefined;
  activeIndex: number;
  allowedDirections: AdvanceDirection[];
  cards: DeckItem[];
  controlled: boolean;
  disabled: boolean;
  dispatch: DeckDispatch;
  distanceThreshold: number;
  mode: DeckMode;
  onAdvance: DeckRootProps["onAdvance"];
  onAdvanceEnd: DeckRootProps["onAdvanceEnd"];
  onExhausted: DeckRootProps["onExhausted"];
  onIndexChange: DeckRootProps["onIndexChange"];
  onKeyDown: DeckRootProps["onKeyDown"];
  velocityThreshold: number;
}) => {
  const commitAdvance = (direction: AdvanceDirection, velocity = 0) => {
    if (disabled || activeCard === undefined) {
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

    dispatch({
      controlled,
      direction,
      mode,
      nextIndex,
      type: "advance",
      velocity,
    });
    onAdvance?.(event);
    onIndexChange?.(nextIndex);
    onAdvanceEnd?.(event);

    if (mode === "finite" && nextIndex >= cards.length) {
      onExhausted?.();
    }
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dispatch({ offset: info.offset.x, type: "drag" });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dispatch({ type: "reset-drag" });

    const target = event.currentTarget;
    const decision = getAdvanceDecision({
      allowedDirections,
      distanceThreshold,
      offsetX: info.offset.x,
      velocityThreshold,
      velocityX: info.velocity.x,
      width: target instanceof HTMLElement ? target.offsetWidth : 1,
    });

    if (decision.accepted) {
      commitAdvance(decision.direction, info.velocity.x);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
  };

  return { handleDrag, handleDragEnd, handleKeyDown };
};

const DeckRenderedCard = ({
  activeIndex,
  depth,
  disabled,
  dragElastic,
  dragOffset,
  dragProgress,
  exitCustom,
  handleDrag,
  handleDragEnd,
  isDragging,
  item,
  lastDirection,
  peekOffset,
  reduceMotion,
  renderOverlay,
  rotation,
  scaleStep,
  visibleCount,
}: DeckRenderedCardProps) => {
  const active = depth === 0;
  const card = item.element;
  const cardProps = card.props;
  const cardStyle = {
    ...cardProps.style,
    "--deck-depth": depth,
  } as CSSProperties;
  const draggable = active && !disabled;
  const overlayState: DeckRenderOverlayState = {
    active,
    depth,
    direction: lastDirection,
    index: activeIndex + depth,
    itemId: item.id,
  };
  const idleRotate = reduceMotion ? 0 : resolveCardRotation(item.id, rotation);
  const cardRotate = getCardRotationValue(active, isDragging, reduceMotion, dragOffset, idleRotate);
  const cardMotion = getCardDepthMotion(
    active,
    isDragging,
    reduceMotion,
    depth,
    dragProgress,
    peekOffset,
    scaleStep,
  );

  return (
    <m.div
      {...cardProps}
      aria-hidden={active ? undefined : true}
      animate={{
        opacity: 1,
        rotate: cardRotate,
        scale: active ? 1 : cardMotion.scale,
        y: active ? 0 : cardMotion.y,
        zIndex: visibleCount - depth,
      }}
      className={joinClassNames("patternmode-deck-card", cardProps.className)}
      custom={exitCustom}
      data-active={active ? "true" : "false"}
      data-depth={depth}
      data-direction={lastDirection ?? undefined}
      drag={active && !disabled ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={dragElastic}
      dragMomentum={true}
      dragTransition={{
        bounceDamping: 22,
        bounceStiffness: 300,
        power: 0.3,
        timeConstant: 350,
      }}
      exit="exit"
      initial={false}
      onDrag={draggable ? handleDrag : undefined}
      onDragEnd={draggable ? handleDragEnd : undefined}
      style={cardStyle}
      transition={{
        default: {
          damping: 28,
          stiffness: 320,
          type: "spring",
        },
        opacity: { duration: 0.2, ease: "easeOut" },
        rotate: getRotateTransition(active, isDragging),
        scale: {
          damping: 28,
          stiffness: 350,
          type: "spring",
        },
        y: { damping: 28, stiffness: 300, type: "spring" },
      }}
      variants={cardExitVariants}
      whileDrag={getWhileDrag(draggable, reduceMotion)}
    >
      {cardProps.children}
      {renderOverlay?.(overlayState)}
    </m.div>
  );
};

const DeckRenderedCards = ({
  activeIndex,
  cardsLength,
  disabled,
  dragElastic,
  dragOffset,
  dragProgress,
  exitCustom,
  handleDrag,
  handleDragEnd,
  isDragging,
  lastDirection,
  mode,
  peekOffset,
  reduceMotion,
  renderOverlay,
  rotation,
  scaleStep,
  visibleCards,
  visualBaseIndex,
}: DeckRenderedCardsProps) => (
  <LazyMotion features={domMax}>
    <AnimatePresence custom={exitCustom} initial={false}>
      {visibleCards.map((item, depth) => (
        <DeckRenderedCard
          activeIndex={activeIndex}
          depth={depth}
          disabled={disabled}
          dragElastic={dragElastic}
          dragOffset={dragOffset}
          dragProgress={dragProgress}
          exitCustom={exitCustom}
          handleDrag={handleDrag}
          handleDragEnd={handleDragEnd}
          isDragging={isDragging}
          item={item}
          key={getDeckRenderKey(
            item.id,
            getAbsoluteVisualIndex(mode, visualBaseIndex, activeIndex, depth),
            cardsLength,
            mode,
          )}
          lastDirection={lastDirection}
          peekOffset={peekOffset}
          reduceMotion={reduceMotion}
          renderOverlay={renderOverlay}
          rotation={rotation}
          scaleStep={scaleStep}
          visibleCount={visibleCards.length}
        />
      ))}
    </AnimatePresence>
  </LazyMotion>
);

export const DeckRoot = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  allowedDirections: allowedDirectionsProp,
  children,
  className,
  defaultIndex: defaultIndexProp,
  disabled: disabledProp,
  distanceThreshold: distanceThresholdProp,
  dragElastic: dragElasticProp,
  index,
  mode: modeProp,
  onExhausted,
  onIndexChange,
  onKeyDown,
  onAdvance,
  onAdvanceEnd,
  peekOffset: peekOffsetProp,
  perspective: perspectiveProp,
  ref,
  renderOverlay,
  rotation: rotationProp,
  scaleStep: scaleStepProp,
  style,
  tabIndex,
  velocityThreshold: velocityThresholdProp,
  visibleCount: visibleCountProp,
  ...props
}: DeckRootProps) => {
  const allowedDirections = withDefault(allowedDirectionsProp, DEFAULT_DIRECTIONS);
  const defaultIndex = withDefault(defaultIndexProp, 0);
  const disabled = withDefault(disabledProp, false);
  const distanceThreshold = withDefault(distanceThresholdProp, DEFAULT_DISTANCE_THRESHOLD);
  const dragElastic = withDefault(dragElasticProp, DEFAULT_DRAG_ELASTIC);
  const mode = withDefault(modeProp, "cycle");
  const peekOffset = withDefault(peekOffsetProp, DEFAULT_PEEK_OFFSET);
  const perspective = withDefault(perspectiveProp, DEFAULT_PERSPECTIVE);
  const rotation = withDefault(rotationProp, DEFAULT_ROTATION);
  const scaleStep = withDefault(scaleStepProp, DEFAULT_SCALE_STEP);
  const velocityThreshold = withDefault(velocityThresholdProp, DEFAULT_VELOCITY_THRESHOLD);
  const visibleCount = withDefault(visibleCountProp, DEFAULT_VISIBLE_COUNT);
  const generatedId = useId();
  const [state, dispatch] = useReducer(deckReducer, defaultIndex, createDeckState);
  const reduceMotion = useReducedMotion() === true;
  const controlled = index !== undefined;
  const activeIndex = controlled ? index : state.internalIndex;
  const { cards, empty } = useDeckChildren(children, generatedId);
  const visibleCards = getVisibleDeckItems(cards, activeIndex, visibleCount, mode);
  const [activeCard] = visibleCards;
  const exhausted = mode === "finite" && visibleCards.length === 0;

  const isDragging = state.dragOffset !== 0;
  const dragProgress = Math.min(1, Math.abs(state.dragOffset) / BG_RESPONSE_RAMP);

  const exitCustom = { direction: state.lastDirection, velocity: state.exitVelocity };
  const { handleDrag, handleDragEnd, handleKeyDown } = useDeckInteractions({
    activeCard,
    activeIndex,
    allowedDirections,
    cards,
    controlled,
    disabled,
    dispatch,
    distanceThreshold,
    mode,
    onAdvance,
    onAdvanceEnd,
    onExhausted,
    onIndexChange,
    onKeyDown,
    velocityThreshold,
  });

  const rootStyle = { ...style, "--deck-perspective": `${perspective}px` } as CSSProperties;
  const controlProps = getDeckControlProps({
    activeIndex,
    ariaLabel,
    ariaLabelledBy,
    itemId: activeCard?.id,
    total: cards.length,
  });
  const rootDataProps = getDeckRootDataProps(disabled, exhausted);

  return (
    <div
      {...props}
      {...rootDataProps}
      className={joinClassNames("patternmode-deck", className)}
      ref={ref}
      style={rootStyle}
      tabIndex={tabIndex}
    >
      <input
        {...controlProps}
        className="patternmode-deck__control"
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <DeckRenderedCards
        activeIndex={activeIndex}
        cardsLength={cards.length}
        disabled={disabled}
        dragElastic={dragElastic}
        dragOffset={state.dragOffset}
        dragProgress={dragProgress}
        exitCustom={exitCustom}
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
        isDragging={isDragging}
        lastDirection={state.lastDirection}
        mode={mode}
        peekOffset={peekOffset}
        reduceMotion={reduceMotion}
        renderOverlay={renderOverlay}
        rotation={rotation}
        scaleStep={scaleStep}
        visibleCards={visibleCards}
        visualBaseIndex={state.visualBaseIndex}
      />
      {exhausted && empty !== null ? empty : null}
    </div>
  );
};

DeckRoot.displayName = "Deck";

const Deck = Object.assign(DeckRoot, {
  Card: DeckCard,
  Empty: DeckEmpty,
});

const CardStack = Deck;

export { CardStack, Deck };
