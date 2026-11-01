import type { ComponentType, ReactNode } from "react";

import type { ResolvedClassNames } from "../renderer-helpers";
import type { StackMotion } from "../stack-motion";
import type {
  HeaderRenderProps,
  ResolvedConfig,
  SheetData,
  SheetItem,
  Side,
  StacksheetLayout,
} from "../types";

export interface SheetPanelProps {
  activeSnapIndex: number;
  Content: ComponentType<SheetData> | undefined;
  classNames: ResolvedClassNames;
  close: () => void;
  config: ResolvedConfig;
  depth: number;
  index: number;
  isNested: boolean;
  isTop: boolean;
  item: SheetItem;
  /** On-screen keyboard height (px) to lift bottom sheets above; 0 when inactive. */
  keyboardInset: number;
  layout?: StacksheetLayout;
  onSnap: (index: number) => void;
  pop: () => void;
  prefersReducedMotion: boolean;
  renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
  shouldRender: boolean;
  side: Side;
  snapHeights: number[];
  /** Motion shared by the Sheet Stack: depth beneath moving Panels, and the backdrop */
  stackMotion: StackMotion;
  swipeClose: () => void;
  swipePop: () => void;
}
