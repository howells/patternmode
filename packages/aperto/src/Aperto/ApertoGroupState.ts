import type { NavigationDirection } from "../expanded-media-stage";
import type {
  ApertoMediaTransition,
  ApertoRect,
} from "../media-transition-utils";

export interface ApertoGroupState {
  closing: boolean;
  internalIndex: number;
  layoutSourceIndex: number;
  mediaTransition: ApertoMediaTransition | null;
  navigationDirection: NavigationDirection;
  open: boolean;
}

export type ApertoGroupAction =
  | { type: "close-without-transition" }
  | { type: "complete-opening-target"; rect: ApertoRect }
  | { type: "finish-transition" }
  | { type: "navigate"; direction: NavigationDirection; index: number }
  | {
      type: "open-at-index";
      index: number;
      transition: ApertoMediaTransition | null;
    }
  | { type: "set-index"; index: number }
  | { type: "set-open"; open: boolean }
  | { type: "start-close"; transition: ApertoMediaTransition };

export function getInitialGroupState(initialIndex: number): ApertoGroupState {
  return {
    closing: false,
    internalIndex: initialIndex,
    layoutSourceIndex: initialIndex,
    mediaTransition: null,
    navigationDirection: 0,
    open: false,
  };
}

export function apertoGroupReducer(
  state: ApertoGroupState,
  action: ApertoGroupAction,
): ApertoGroupState {
  switch (action.type) {
    case "close-without-transition":
      return { ...state, closing: false, mediaTransition: null, open: false };
    case "complete-opening-target":
      if (
        state.mediaTransition?.phase !== "opening" ||
        state.mediaTransition.to
      ) {
        return state;
      }
      return {
        ...state,
        mediaTransition: { ...state.mediaTransition, to: action.rect },
      };
    case "finish-transition":
      return {
        ...state,
        closing: false,
        mediaTransition: null,
        open: state.mediaTransition?.phase === "closing" ? false : state.open,
      };
    case "navigate":
      return {
        ...state,
        internalIndex: action.index,
        layoutSourceIndex: action.index,
        navigationDirection: action.direction,
      };
    case "open-at-index":
      return {
        ...state,
        closing: false,
        internalIndex: action.index,
        layoutSourceIndex: action.index,
        mediaTransition: action.transition,
        navigationDirection: 0,
        open: true,
      };
    case "set-index":
      return { ...state, internalIndex: action.index };
    case "set-open":
      return action.open
        ? { ...state, closing: false, open: true }
        : { ...state, open: false };
    case "start-close":
      return {
        ...state,
        closing: true,
        mediaTransition: action.transition,
      };
  }
}
