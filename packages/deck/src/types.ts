import type { HTMLMotionProps } from "motion/react";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type DeckMode = "cycle" | "finite";

export type AdvanceDirection = "left" | "right";

export interface DeckItem {
  element: ReactNode;
  id: string;
}

export interface DeckAdvanceEvent {
  direction: AdvanceDirection;
  index: number;
  itemId: string;
  mode: DeckMode;
  nextIndex: number;
}

export interface DeckRenderOverlayState {
  active: boolean;
  depth: number;
  direction: AdvanceDirection | null;
  index: number;
  itemId: string;
}

export interface DeckRootProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onDrag" | "onDragEnd"
> {
  allowedDirections?: AdvanceDirection[];
  children: ReactNode;
  defaultIndex?: number;
  disabled?: boolean;
  distanceThreshold?: number;
  dragElastic?: number;
  index?: number;
  mode?: DeckMode;
  onExhausted?: () => void;
  onIndexChange?: (index: number) => void;
  onAdvance?: (event: DeckAdvanceEvent) => void;
  onAdvanceEnd?: (event: DeckAdvanceEvent) => void;
  peekOffset?: number;
  perspective?: number;
  renderOverlay?: (state: DeckRenderOverlayState) => ReactNode;
  rotation?: number;
  scaleStep?: number;
  velocityThreshold?: number;
  visibleCount?: number;
}

export interface DeckCardProps extends Omit<
  HTMLMotionProps<"div">,
  | "animate"
  | "children"
  | "drag"
  | "dragConstraints"
  | "dragElastic"
  | "dragMomentum"
  | "exit"
  | "initial"
  | "onDrag"
  | "onDragEnd"
  | "onDragStart"
  | "style"
  | "transition"
  | "whileDrag"
> {
  children: ReactNode;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export interface DeckEmptyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export type DeckCardElement = ReactElement<DeckCardProps>;
export type DeckEmptyElement = ReactElement<DeckEmptyProps>;
