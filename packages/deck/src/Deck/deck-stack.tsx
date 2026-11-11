"use client";

import { AnimatePresence, domMax, LazyMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { getDeckRenderKey } from "../logic";
import type { DeckEnterMode, DeckItem, DeckMode } from "../types";
import { DeckRenderedCard } from "./deck-rendered-card";
import type { DeckStackState } from "./deck-rendered-card";

/**
 * Ids of visible cards the deck has never shown before, excluding the first
 * render. A card stays "entering" for the render it mounts in and is then
 * remembered, so a cycle-mode repeat or a promotion never re-enters.
 */
const useEnteringCardIds = (
  visibleCards: DeckItem[],
  enter: DeckEnterMode,
): ReadonlySet<string> => {
  const shownIds = useRef<Set<string> | null>(null);
  const entering = new Set<string>();

  /* oxlint-disable react/refs -- the ids shown on earlier commits decide which cards animate in, so this reads the ref during render by design and records new ids after commit. */
  if (shownIds.current === null) {
    shownIds.current = new Set(visibleCards.map((item) => item.id));
  } else if (enter !== "none") {
    for (const item of visibleCards) {
      if (!shownIds.current.has(item.id)) {
        entering.add(item.id);
      }
    }
  }
  /* oxlint-enable react/refs */

  useEffect(() => {
    for (const item of visibleCards) {
      shownIds.current?.add(item.id);
    }
  });

  return entering;
};

/** The visible cards, keyed so a cycle-mode repeat mounts as a new card and exits animate. */
export const DeckStack = ({
  cardsLength,
  enter,
  mode,
  stack,
  visibleCards,
  visualBaseIndex,
}: {
  cardsLength: number;
  enter: DeckEnterMode;
  mode: DeckMode;
  stack: DeckStackState;
  visibleCards: DeckItem[];
  visualBaseIndex: number;
}) => {
  const enteringIds = useEnteringCardIds(visibleCards, enter);
  const baseIndex = mode === "cycle" ? visualBaseIndex : stack.activeIndex;

  return (
    <LazyMotion features={domMax}>
      <AnimatePresence
        custom={stack.exitCustom}
        initial={false}
        onExitComplete={stack.interactions.handleExitComplete}
      >
        {visibleCards.map((item, depth) => (
          <DeckRenderedCard
            depth={depth}
            entering={enteringIds.has(item.id)}
            item={item}
            key={getDeckRenderKey(item.id, baseIndex + depth, cardsLength, mode)}
            stack={stack}
          />
        ))}
      </AnimatePresence>
    </LazyMotion>
  );
};
