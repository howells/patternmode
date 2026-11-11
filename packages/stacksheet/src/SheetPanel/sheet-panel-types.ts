import type { ComponentType, ReactNode } from "react";

import type { ResolvedClassNames } from "../renderer-helpers";
import type { StackMotion } from "../stack-motion";
import type { HeaderRenderProps, ResolvedConfig, SheetData, SheetItem, Side } from "../types";

export interface SheetPanelProps {
  activeSnapIndex: number;
  Content: ComponentType<SheetData>;
  classNames: ResolvedClassNames;
  /** Close the whole Sheet Stack */
  close: () => void;
  config: ResolvedConfig;
  depth: number;
  index: number;
  /** Composable layout: the Sheet's content draws its own chrome */
  isComposable: boolean;
  isNested: boolean;
  isTop: boolean;
  item: SheetItem;
  /** On-screen keyboard height (px) to lift bottom sheets above; 0 when inactive. */
  keyboardInset: number;
  onSnap: (index: number) => void;
  /** Pop this Sheet because it was swiped away */
  onSwipeDismiss: () => void;
  /** Pop the top Sheet, closing the stack when it is the last */
  pop: () => void;
  prefersReducedMotion: boolean;
  renderHeader?: (props: HeaderRenderProps) => ReactNode;
  shouldRender: boolean;
  side: Side;
  snapHeights: number[];
  /** Motion shared by the Sheet Stack: depth beneath moving Panels, and the backdrop */
  stackMotion: StackMotion;
}
