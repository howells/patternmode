import { useMotionValue } from "motion/react";
import type { PanInfo } from "motion/react";
import { useRef } from "react";
import type { KeyboardEvent } from "react";

import { getAdvanceDecision, getNextDeckIndex } from "../logic";
import type {
  AdvanceDirection,
  DeckAdvanceEvent,
  DeckItem,
  DeckMode,
  DeckRootProps,
} from "../types";

export interface DeckState {
  exitVelocity: number;
  /** The active index of an uncontrolled deck. A controlled deck reads its `index` prop instead. */
  internalIndex: number;
  lastDirection: AdvanceDirection | null;
  /** Counts advances so a cycle-mode card that comes round again mounts under a new key. */
  visualBaseIndex: number;
}

export interface DeckAdvance {
  direction: AdvanceDirection;
  nextIndex: number;
  velocity: number;
}

export const createDeckState = (defaultIndex: number): DeckState => ({
  exitVelocity: 0,
  internalIndex: defaultIndex,
  lastDirection: null,
  visualBaseIndex: defaultIndex,
});

export const deckReducer = (state: DeckState, advance: DeckAdvance): DeckState => ({
  exitVelocity: advance.velocity,
  internalIndex: advance.nextIndex,
  lastDirection: advance.direction,
  visualBaseIndex: state.visualBaseIndex + 1,
});

/** Drag, keyboard, and advance-lifecycle handlers shared by the deck's cards. */
export const useDeckInteractions = ({
  activeCard,
  activeIndex,
  allowedDirections,
  cards,
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
  disabled: boolean;
  dispatch: (advance: DeckAdvance) => void;
  distanceThreshold: number;
  mode: DeckMode;
  onAdvance: DeckRootProps["onAdvance"];
  onAdvanceEnd: DeckRootProps["onAdvanceEnd"];
  onExhausted: DeckRootProps["onExhausted"];
  onIndexChange: DeckRootProps["onIndexChange"];
  onKeyDown: DeckRootProps["onKeyDown"];
  velocityThreshold: number;
}) => {
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  /** The active card's horizontal drag offset, shared by the stack without re-rendering it. */
  const dragOffset = useMotionValue(0);
  const dragWidthRef = useRef(0);
  const pendingAdvanceEndRef = useRef<DeckAdvanceEvent | null>(null);

  const flushAdvanceEnd = () => {
    const pending = pendingAdvanceEndRef.current;

    if (pending === null) {
      return;
    }

    pendingAdvanceEndRef.current = null;
    onAdvanceEnd?.(pending);
  };

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

    dispatch({ direction, nextIndex, velocity });
    onAdvance?.(event);
    onIndexChange?.(nextIndex);
    // Deliver any advance whose exit never completed, then defer this one
    // until AnimatePresence reports the exit animation has finished.
    flushAdvanceEnd();
    pendingAdvanceEndRef.current = event;

    if (mode === "finite" && nextIndex >= cards.length) {
      onExhausted?.();
    }
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragOffset.set(info.offset.x);
  };

  const handleDragStart = () => {
    dragWidthRef.current = activeCardRef.current?.getBoundingClientRect().width ?? 0;
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragOffset.set(0);

    const width = dragWidthRef.current;
    dragWidthRef.current = 0;

    // A drag can only start on a card the pointer hit, so a laid-out card
    // always has a width. Zero means the card was never measured.
    if (width <= 0) {
      throw new Error("Deck could not measure the active card's width at drag start.");
    }

    const decision = getAdvanceDecision({
      allowedDirections,
      distanceThreshold,
      offsetX: info.offset.x,
      velocityThreshold,
      velocityX: info.velocity.x,
      width,
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

  return {
    activeCardRef,
    dragOffset,
    handleDrag,
    handleDragEnd,
    handleDragStart,
    handleExitComplete: flushAdvanceEnd,
    handleKeyDown,
  };
};

export type DeckInteractions = ReturnType<typeof useDeckInteractions>;
