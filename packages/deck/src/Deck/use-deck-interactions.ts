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
import { FALLBACK_CARD_WIDTH } from "./deck-constants";

export interface DeckState {
  dragOffset: number;
  exitVelocity: number;
  internalIndex: number;
  lastDirection: AdvanceDirection | null;
  visualBaseIndex: number;
}

export type DeckAction =
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

export type DeckDispatch = (action: DeckAction) => void;

export const createDeckState = (defaultIndex: number): DeckState => ({
  dragOffset: 0,
  exitVelocity: 0,
  internalIndex: defaultIndex,
  lastDirection: null,
  visualBaseIndex: defaultIndex,
});

export const deckReducer = (state: DeckState, action: DeckAction): DeckState => {
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

/** Drag, keyboard, and advance-lifecycle handlers shared by the deck's cards. */
export const useDeckInteractions = ({
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
  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const dragWidthRef = useRef(0);
  const pendingAdvanceEndRef = useRef<DeckAdvanceEvent | null>(null);

  const measureActiveCardWidth = () => activeCardRef.current?.getBoundingClientRect().width ?? 0;

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
    // Deliver any advance whose exit never completed, then defer this one
    // until AnimatePresence reports the exit animation has finished.
    flushAdvanceEnd();
    pendingAdvanceEndRef.current = event;

    if (mode === "finite" && nextIndex >= cards.length) {
      onExhausted?.();
    }
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dispatch({ offset: info.offset.x, type: "drag" });
  };

  const handleDragStart = () => {
    dragWidthRef.current = measureActiveCardWidth();
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dispatch({ type: "reset-drag" });

    // Prefer the width captured at drag start; the drag-end event is
    // dispatched from the window, so its currentTarget cannot be measured.
    const measuredWidth =
      dragWidthRef.current > 0 ? dragWidthRef.current : measureActiveCardWidth();
    dragWidthRef.current = 0;
    const decision = getAdvanceDecision({
      allowedDirections,
      distanceThreshold,
      offsetX: info.offset.x,
      velocityThreshold,
      velocityX: info.velocity.x,
      width: measuredWidth > 0 ? measuredWidth : FALLBACK_CARD_WIDTH,
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
    handleDrag,
    handleDragEnd,
    handleDragStart,
    handleExitComplete: flushAdvanceEnd,
    handleKeyDown,
  };
};

export type DeckInteractions = ReturnType<typeof useDeckInteractions>;
