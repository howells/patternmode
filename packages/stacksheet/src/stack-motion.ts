import { motionValue } from "motion/react";
import type { MotionValue } from "motion/react";

/** One rendered Panel, present or leaving, as the Sheet Stack's motion sees it. */
export interface StackMotionEntry {
  /** Written by the stack: how many Panels sit above this one, fractionally while they move. */
  depth: MotionValue<number>;
  /** How present the Panel is on screen: 1 at rest, 0 fully gone. Read on every update. */
  presence: () => number;
}

/**
 * Motion shared by the Panels of one Sheet Stack.
 *
 * Every Panel reports how present it is (from its own travel and fade), and
 * the stack turns that into each Panel's depth: the sum of the presence of
 * the Panels above it. Depth drives the scale and offset of the Panels
 * beneath, so they recede exactly in step with an incoming Panel, come
 * forward as the top one is dragged away, and retarget from wherever they are
 * when a push, pop or close interrupts another. The backdrop is the presence
 * of the most present Panel, so it fades with the first Sheet's entrance, its
 * drag and its exit.
 */
export interface StackMotion {
  /** Overlay opacity, 0 to 1 */
  backdrop: MotionValue<number>;
  /**
   * Add a Panel. Registration order is stacking order: a Panel registered
   * later is drawn above one registered earlier, which holds because Sheets
   * are only ever added on top.
   */
  register: (entry: StackMotionEntry) => () => void;
  /**
   * Reduced motion: depth counts whole Panels, so the Panels beneath change
   * position at once instead of travelling and scaling.
   */
  setStepped: (stepped: boolean) => void;
  /** Recompute depths and backdrop from the entries' current presence. */
  update: () => void;
}

const clampUnit = (value: number): number => Math.min(1, Math.max(0, value));

export const createStackMotion = (): StackMotion => {
  /** In registration order: bottom first. */
  const entries = new Set<StackMotionEntry>();
  const backdrop = motionValue(0);
  let stepped = false;
  const update = () => {
    const topFirst = [...entries].toReversed();
    let above = 0;
    let visible = 0;
    for (const entry of topFirst) {
      entry.depth.set(above);
      const presence = clampUnit(entry.presence());
      above += stepped ? Math.ceil(presence) : presence;
      visible = Math.max(visible, presence);
    }
    backdrop.set(visible);
  };
  return {
    backdrop,
    register: (entry) => {
      entries.add(entry);
      update();
      return () => {
        entries.delete(entry);
        update();
      };
    },
    setStepped: (value) => {
      stepped = value;
      update();
    },
    update,
  };
};
