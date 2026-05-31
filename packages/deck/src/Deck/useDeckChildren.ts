import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useMemo,
} from "react";

import type { DeckCardElement, DeckEmptyElement } from "../types";
import { DeckCard } from "./DeckCard";
import { DeckEmpty } from "./DeckEmpty";

export function useDeckChildren(children: ReactNode, generatedId: string) {
  return useMemo(() => {
    const cards: DeckItemWithElement[] = [];
    let empty: DeckEmptyElement | null = null;
    let warnedUnsupportedChild = false;

    function collectDeckChildren(node: ReactNode) {
      Children.forEach(node, (child, childIndex) => {
        if (!isValidElement(child)) {
          return;
        }

        const element = child as ReactElement<{ children?: ReactNode }>;

        if (element.type === Fragment) {
          collectDeckChildren(element.props.children);
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
          return;
        }

        if (!warnedUnsupportedChild) {
          warnedUnsupportedChild = true;
          console.warn(
            "Deck.Card must be a direct child of Deck. Fragments are supported, but wrapper elements are ignored."
          );
        }
      });
    }

    collectDeckChildren(children);

    return { cards, empty };
  }, [children, generatedId]);
}

interface DeckItemWithElement {
  element: DeckCardElement;
  id: string;
}
