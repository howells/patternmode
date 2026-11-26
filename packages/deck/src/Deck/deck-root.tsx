"use client";

import { joinClassNames } from "@patternmode/system";
import { useReducedMotion } from "motion/react";
import { useId, useReducer, useState } from "react";
import type { CSSProperties } from "react";

import { getVisibleDeckItems } from "../logic";
import type { DeckRootProps } from "../types";
import { getDeckControlProps } from "./deck-a11y";
import { DeckCard } from "./deck-card";
import {
  DEFAULT_DIRECTIONS,
  DEFAULT_DISTANCE_THRESHOLD,
  DEFAULT_DRAG_ELASTIC,
  DEFAULT_ENTER,
  DEFAULT_PEEK_OFFSET,
  DEFAULT_PERSPECTIVE,
  DEFAULT_ROTATION,
  DEFAULT_SCALE_STEP,
  DEFAULT_VELOCITY_THRESHOLD,
  DEFAULT_VISIBLE_COUNT,
} from "./deck-constants";
import { DeckEmpty } from "./deck-empty";
import { DeckStack } from "./deck-stack";
import { useDeckChildren } from "./use-deck-children";
import { createDeckState, deckReducer, useDeckInteractions } from "./use-deck-interactions";

/**
 * The pass-numbered base of a cycle deck's render keys. An uncontrolled deck
 * counts its own advances; a controlled deck derives the base from the
 * `index` transitions it observes, so a parent that wraps or jumps the index
 * still gets new keys for the cards that move, and one that ignores an
 * advance gets none.
 */
const useVisualBaseIndex = (
  isControlled: boolean,
  activeIndex: number,
  cardsLength: number,
  uncontrolledVisualBase: number,
): number => {
  const [controlledBase, setControlledBase] = useState({
    base: activeIndex,
    prevIndex: activeIndex,
  });

  if (isControlled && activeIndex !== controlledBase.prevIndex) {
    const delta =
      cardsLength > 0
        ? (((activeIndex - controlledBase.prevIndex) % cardsLength) + cardsLength) % cardsLength
        : 0;
    const nextBase = controlledBase.base + delta;
    setControlledBase({ base: nextBase, prevIndex: activeIndex });
    return nextBase;
  }

  return isControlled ? controlledBase.base : uncontrolledVisualBase;
};

export const DeckRoot = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  allowedDirections = DEFAULT_DIRECTIONS,
  children,
  className,
  defaultIndex = 0,
  disabled = false,
  distanceThreshold = DEFAULT_DISTANCE_THRESHOLD,
  dragElastic = DEFAULT_DRAG_ELASTIC,
  enter = DEFAULT_ENTER,
  index,
  mode = "cycle",
  onAdvance,
  onAdvanceEnd,
  onExhausted,
  onIndexChange,
  onKeyDown,
  peekOffset = DEFAULT_PEEK_OFFSET,
  perspective = DEFAULT_PERSPECTIVE,
  renderOverlay,
  rotation = DEFAULT_ROTATION,
  scaleStep = DEFAULT_SCALE_STEP,
  style,
  velocityThreshold = DEFAULT_VELOCITY_THRESHOLD,
  visibleCount = DEFAULT_VISIBLE_COUNT,
  ...props
}: DeckRootProps) => {
  const generatedId = useId();
  const [state, dispatch] = useReducer(deckReducer, defaultIndex, createDeckState);
  const reduceMotion = useReducedMotion() === true;
  const isControlled = index !== undefined;
  const activeIndex = isControlled ? index : state.internalIndex;
  const { cards, empty } = useDeckChildren(children, generatedId);
  const visualBaseIndex = useVisualBaseIndex(
    isControlled,
    activeIndex,
    cards.length,
    state.visualBaseIndex,
  );
  const visibleCards = getVisibleDeckItems(cards, activeIndex, visibleCount, mode);
  const [activeCard] = visibleCards;
  const exhausted = mode === "finite" && visibleCards.length === 0;
  const interactions = useDeckInteractions({
    activeCard,
    activeIndex,
    allowedDirections,
    cards,
    disabled,
    dispatch,
    distanceThreshold,
    isControlled,
    mode,
    onAdvance,
    onAdvanceEnd,
    onExhausted,
    onIndexChange,
    onKeyDown,
    velocityThreshold,
  });
  const perspectiveVariable = { "--deck-perspective": `${perspective}px` };
  const rootStyle: CSSProperties = { ...style, ...perspectiveVariable };

  return (
    <div
      {...props}
      className={joinClassNames("patternmode-deck", className)}
      data-disabled={disabled ? "true" : undefined}
      data-empty={exhausted ? "true" : undefined}
      style={rootStyle}
    >
      <input
        {...getDeckControlProps({ activeCard, activeIndex, ariaLabel, ariaLabelledBy, cards })}
        className="patternmode-deck__control"
        disabled={disabled}
        onKeyDown={interactions.handleKeyDown}
      />
      <DeckStack
        cardsLength={cards.length}
        enter={enter}
        mode={mode}
        stack={{
          activeIndex,
          disabled,
          dragElastic,
          exitCustom: { direction: state.lastDirection, velocity: state.exitVelocity },
          interactions,
          lastDirection: state.lastDirection,
          peekOffset,
          reduceMotion,
          renderOverlay,
          rotation,
          scaleStep,
          visibleCount,
        }}
        visibleCards={visibleCards}
        visualBaseIndex={visualBaseIndex}
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

export { Deck };
