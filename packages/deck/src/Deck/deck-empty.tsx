import { joinClassNames } from "@patternmode/system";

import type { DeckEmptyProps } from "../types";

export const DeckEmpty = ({ children, className, ref, ...props }: DeckEmptyProps) => (
  <div {...props} className={joinClassNames("patternmode-deck-empty", className)} ref={ref}>
    {children}
  </div>
);

DeckEmpty.displayName = "Deck.Empty";
