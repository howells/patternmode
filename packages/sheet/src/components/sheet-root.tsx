"use client";

import { Dialog } from "@base-ui-components/react/dialog";
import type * as React from "react";

/**
 * Props for the Sheet component.
 */
type SheetProps = React.ComponentPropsWithoutRef<typeof Dialog.Root>;

/**
 * Sheet overlay panel component sliding from screen edges for desktop-optimized interfaces.
 */
const Sheet = (props: SheetProps) => {
  return <Dialog.Root data-testid="sheet" {...props} />;
};
Sheet.displayName = "Sheet";

export { Sheet };
export type { SheetProps };
