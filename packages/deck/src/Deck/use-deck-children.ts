import { Children, Fragment, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

import type { DeckCardElement, DeckCardProps, DeckEmptyElement, DeckEmptyProps } from "../types";
import { DeckCard } from "./deck-card";
import { DeckEmpty } from "./deck-empty";

interface DeckChildrenResult {
  cards: DeckItemWithElement[];
  empty: DeckEmptyElement | null;
}

const isFragmentElement = (
  child: ReactNode,
): child is ReactElement<{ children?: ReactNode }, typeof Fragment> =>
  isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment;

const isDeckCardElement = (child: ReactNode): child is DeckCardElement =>
  isValidElement<DeckCardProps>(child) && child.type === DeckCard;

const isDeckEmptyElement = (child: ReactNode): child is DeckEmptyElement =>
  isValidElement<DeckEmptyProps>(child) && child.type === DeckEmpty;

export const useDeckChildren = (children: ReactNode, generatedId: string): DeckChildrenResult => {
  const cards: DeckItemWithElement[] = [];
  let empty: DeckEmptyElement | null = null;
  let warnedUnsupportedChild = false;

  const collectDeckChildren = (node: ReactNode) => {
    Children.forEach(node, (child, childIndex) => {
      if (isFragmentElement(child)) {
        collectDeckChildren(child.props.children);
        return;
      }

      if (isDeckCardElement(child)) {
        const id =
          child.key === null ? `${generatedId}-${childIndex}` : child.key.replace(/^\.\$/u, "");
        cards.push({ element: child, id });
        return;
      }

      if (isDeckEmptyElement(child)) {
        empty = child;
        return;
      }

      if (!warnedUnsupportedChild) {
        warnedUnsupportedChild = true;
        console.warn(
          "Deck.Card must be a direct child of Deck. Fragments are supported, but wrapper elements are ignored.",
        );
      }
    });
  };

  collectDeckChildren(children);

  return { cards, empty };
};

interface DeckItemWithElement {
  element: DeckCardElement;
  id: string;
}
