import type { NavigationDirection } from "../expanded-media-stage";
import type { ApertoMediaTransition, ApertoRect } from "../media-transition-utils";
import type { ApertoMediaItem } from "../types";

/**
 * Where the Expanded Media is in its life. `openerIndex` is the Thumbnail that
 * opened it; focus returns there on close, so `closed` keeps the last one.
 * An `opening` phase without `to` is still measuring its target.
 */
export type ApertoGroupPhase =
  | { name: "closed"; openerIndex: number | null }
  | {
      from: ApertoRect;
      item: ApertoMediaItem;
      name: "opening";
      openerIndex: number;
      to?: ApertoRect;
    }
  | { name: "open"; openerIndex: number }
  | ({ name: "closing"; openerIndex: number } & ApertoMediaTransition);

export interface ApertoGroupState {
  /** Active index while the group is uncontrolled. */
  internalIndex: number;
  navigationDirection: NavigationDirection;
  phase: ApertoGroupPhase;
}

type ApertoPhaseAction =
  | { type: "finish-transition" }
  | { type: "measure-opening-target"; rect: ApertoRect }
  | { type: "open"; index: number }
  | {
      type: "open-from-thumbnail";
      index: number;
      source: { from: ApertoRect; item: ApertoMediaItem } | null;
    }
  | { type: "start-close"; transition: ApertoMediaTransition | null };

export type ApertoGroupAction =
  | ApertoPhaseAction
  | { type: "navigate"; direction: NavigationDirection }
  | { type: "set-index"; index: number };

export const getInitialGroupState = (initialIndex: number): ApertoGroupState => ({
  internalIndex: initialIndex,
  navigationDirection: 0,
  phase: { name: "closed", openerIndex: null },
});

const unhandled = (action: never): never => {
  throw new Error(`Unhandled Aperto group action: ${JSON.stringify(action)}`);
};

const finishTransition = (phase: ApertoGroupPhase): ApertoGroupPhase => {
  if (phase.name === "opening" && phase.to !== undefined) {
    return { name: "open", openerIndex: phase.openerIndex };
  }
  if (phase.name === "closing") {
    return { name: "closed", openerIndex: phase.openerIndex };
  }
  return phase;
};

const startClose = (
  phase: ApertoGroupPhase,
  transition: ApertoMediaTransition | null,
): ApertoGroupPhase => {
  if (phase.name !== "opening" && phase.name !== "open") {
    return phase;
  }
  return transition === null
    ? { name: "closed", openerIndex: phase.openerIndex }
    : { ...transition, name: "closing", openerIndex: phase.openerIndex };
};

const reducePhase = (phase: ApertoGroupPhase, action: ApertoPhaseAction): ApertoGroupPhase => {
  switch (action.type) {
    case "finish-transition": {
      return finishTransition(phase);
    }
    case "measure-opening-target": {
      return phase.name === "opening" && phase.to === undefined
        ? { ...phase, to: action.rect }
        : phase;
    }
    case "open": {
      return phase.name === "closed" ? { name: "open", openerIndex: action.index } : phase;
    }
    case "open-from-thumbnail": {
      return action.source === null
        ? { name: "open", openerIndex: action.index }
        : { ...action.source, name: "opening", openerIndex: action.index };
    }
    case "start-close": {
      return startClose(phase, action.transition);
    }
    default: {
      return unhandled(action);
    }
  }
};

export const apertoGroupReducer = (
  state: ApertoGroupState,
  action: ApertoGroupAction,
): ApertoGroupState => {
  switch (action.type) {
    case "navigate": {
      return { ...state, navigationDirection: action.direction };
    }
    case "set-index": {
      return { ...state, internalIndex: action.index };
    }
    case "open-from-thumbnail": {
      return { ...state, navigationDirection: 0, phase: reducePhase(state.phase, action) };
    }
    case "finish-transition":
    case "measure-opening-target":
    case "open":
    case "start-close": {
      const phase = reducePhase(state.phase, action);
      return phase === state.phase ? state : { ...state, phase };
    }
    default: {
      return unhandled(action);
    }
  }
};

export const isPhaseOpen = (phase: ApertoGroupPhase): boolean => phase.name !== "closed";

/** The clone's flight, once both ends are known. */
export const getFlight = (phase: ApertoGroupPhase): ApertoMediaTransition | null => {
  if (phase.name === "closing") {
    return { from: phase.from, item: phase.item, to: phase.to };
  }
  if (phase.name === "opening" && phase.to !== undefined) {
    return { from: phase.from, item: phase.item, to: phase.to };
  }
  return null;
};
