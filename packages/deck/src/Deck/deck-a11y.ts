import type { DeckItem } from "../types";

/** A card's own accessible name, when its owner gave it one. */
const getCardLabel = (item: DeckItem): string | undefined => {
  const label = item.element.props["aria-label"]?.trim();

  return label === "" ? undefined : label;
};

/** A labelled card is exposed as a named group unless its owner chose a role. */
export const getCardRole = (item: DeckItem) =>
  item.element.props.role ?? (getCardLabel(item) === undefined ? undefined : "group");

/**
 * What a screen reader announces for the active card. Card ids are React keys
 * or generated ids, so they are never read out: a card's `aria-label` is used
 * when it has one, followed by its place in the deck.
 */
const getDeckValueText = (activeCard: DeckItem | undefined, cards: readonly DeckItem[]) => {
  if (activeCard === undefined) {
    return "No cards";
  }

  const position = `${cards.indexOf(activeCard) + 1} of ${cards.length}`;
  const label = getCardLabel(activeCard);

  return label === undefined ? `Card ${position}` : `${label}, ${position}`;
};

/** Props for the visually hidden range input that carries the deck's keyboard and screen-reader semantics. */
export const getDeckControlProps = ({
  ariaLabel,
  ariaLabelledBy,
  activeCard,
  activeIndex,
  cards,
}: {
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  activeCard: DeckItem | undefined;
  activeIndex: number;
  cards: readonly DeckItem[];
}) => {
  const valueMax = Math.max(cards.length - 1, 0);
  // Cycle mode can carry an index past the end; the card's own place is what
  // the slider should report.
  const valueNow =
    activeCard === undefined
      ? Math.min(Math.max(activeIndex, 0), valueMax)
      : cards.indexOf(activeCard);

  return {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-valuetext": getDeckValueText(activeCard, cards),
    max: valueMax,
    min: 0,
    readOnly: true,
    type: "range" as const,
    value: valueNow,
  };
};
