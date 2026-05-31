import { joinClassNames } from "@patternmode/system";
import { forwardRef } from "react";

import type { DeckEmptyProps } from "../types";

export const DeckEmpty = forwardRef<HTMLDivElement, DeckEmptyProps>(
  ({ children, className, ...props }, ref) => (
    <div
      {...props}
      className={joinClassNames("patternmode-deck-empty", className)}
      ref={ref}
    >
      {children}
    </div>
  )
);

DeckEmpty.displayName = "Deck.Empty";
