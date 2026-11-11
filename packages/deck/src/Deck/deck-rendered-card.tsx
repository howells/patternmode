"use client";

import { joinClassNames } from "@patternmode/system";
import { animate, m, useMotionValue, useSpring, useTransform } from "motion/react";
import type { MotionStyle, MotionValue, PanInfo } from "motion/react";
import type { Ref, RefCallback } from "react";

import { resolveCardRotation } from "../logic";
import type { AdvanceDirection, DeckItem, DeckRootProps } from "../types";
import { getCardRole } from "./deck-a11y";
import {
  BG_RESPONSE_FACTOR,
  BG_RESPONSE_RAMP,
  CARD_DEFAULT_SPRING,
  CARD_ENTER_OFFSET,
  CARD_ENTER_SCALE,
  CARD_ROTATE_SPRING,
  CARD_SCALE_SPRING,
  CARD_Y_SPRING,
  DRAG_INFLUENCE_RAMP,
  DRAG_TILT_MAX,
  DRAG_TILT_RAMP,
} from "./deck-constants";
import { cardExitVariants } from "./deck-motion";
import type { DeckInteractions } from "./use-deck-interactions";

/** Everything a rendered card shares with the rest of the stack. */
export interface DeckStackState {
  activeIndex: number;
  disabled: boolean;
  dragElastic: number;
  exitCustom: { direction: AdvanceDirection | null; velocity: number };
  interactions: DeckInteractions;
  lastDirection: AdvanceDirection | null;
  peekOffset: number;
  reduceMotion: boolean;
  renderOverlay: DeckRootProps["renderOverlay"];
  rotation: number;
  scaleStep: number;
  visibleCount: number;
}

type PointerLikeEvent = MouseEvent | TouchEvent | PointerEvent;

const MIN_CARD_SCALE = 0.7;

/** Where a card settles at a given depth when nothing is being dragged. */
const getRestPose = (depth: number, { peekOffset, reduceMotion, scaleStep }: DeckStackState) => ({
  scale: reduceMotion ? 1 : Math.max(MIN_CARD_SCALE, 1 - depth * scaleStep),
  y: reduceMotion ? 0 : depth * peekOffset,
});

/**
 * How far the active card's tilt departs from its idle rotation at a drag
 * offset: the idle rotation fades out over the first pixels of the drag while
 * a tilt in the drag direction grows.
 */
const getDragTilt = (offset: number, idleRotate: number) => {
  const influence = Math.min(1, Math.abs(offset) / DRAG_INFLUENCE_RAMP);

  return (offset / DRAG_TILT_RAMP) * DRAG_TILT_MAX - idleRotate * influence;
};

/**
 * A background card's response to the active card being dragged: it moves
 * part of the way toward the slot in front of it. Derived from the stack's
 * drag offset Motion value and composed onto the rest pose through separate
 * transform channels (`scaleX`/`scaleY`, `translateY`), so dragging never
 * re-renders React.
 */
const useDragResponse = (dragOffset: MotionValue<number>, depth: number, stack: DeckStackState) => {
  const rest = getRestPose(depth, stack);
  const promoted = getRestPose(depth - 1, stack);
  const responds = depth > 0 && !stack.reduceMotion;
  const progress = useTransform(dragOffset, (offset) =>
    responds ? Math.min(1, Math.abs(offset) / BG_RESPONSE_RAMP) * BG_RESPONSE_FACTOR : 0,
  );
  const scale = useSpring(
    useTransform(progress, (value) => 1 + ((promoted.scale - rest.scale) * value) / rest.scale),
    CARD_SCALE_SPRING,
  );
  const lift = useSpring(
    useTransform(progress, (value) => (promoted.y - rest.y) * value),
    CARD_Y_SPRING,
  );

  return { lift, rest, scale };
};

/**
 * Where an entering card starts: a little beneath and behind its rest pose, so
 * it settles up into the stack on the same springs the stack already uses.
 * Reduced motion fades only.
 */
const getCardEnterInitial = (
  entering: boolean,
  reduceMotion: boolean,
  idleRotate: number,
  rest: { scale: number; y: number },
) => {
  if (!entering) {
    return false;
  }

  if (reduceMotion) {
    return { opacity: 0 };
  }

  return {
    opacity: 0,
    rotate: idleRotate,
    scale: rest.scale * CARD_ENTER_SCALE,
    y: rest.y + CARD_ENTER_OFFSET,
  };
};

const isRefCallback = (ref: Ref<HTMLDivElement> | undefined): ref is RefCallback<HTMLDivElement> =>
  typeof ref === "function";

/** Hands a node to a callback ref or an object ref, whichever the owner supplied. */
const assignRef = (ref: Ref<HTMLDivElement> | undefined, node: HTMLDivElement | null) => {
  if (isRefCallback(ref)) {
    ref(node);
  } else if (ref !== null && ref !== undefined) {
    ref.current = node;
  }
};

export const DeckRenderedCard = ({
  depth,
  entering,
  item,
  stack,
}: {
  depth: number;
  /** True when this card joined the visible stack after the deck first rendered. */
  entering: boolean;
  item: DeckItem;
  stack: DeckStackState;
}) => {
  const { disabled, interactions, lastDirection, reduceMotion } = stack;
  const active = depth === 0;
  const draggable = active && !disabled;
  const cardProps = item.element.props;
  const idleRotate = reduceMotion ? 0 : resolveCardRotation(item.id, stack.rotation);
  const tilt = useMotionValue(0);
  const response = useDragResponse(interactions.dragOffset, depth, stack);
  const consumerRef = cardProps.ref;
  const depthVariable = { "--deck-depth": depth };
  const style: MotionStyle = {
    ...cardProps.style,
    ...depthVariable,
    rotateZ: tilt,
    scaleX: response.scale,
    scaleY: response.scale,
    translateY: response.lift,
  };

  const attachCardRef = (node: HTMLDivElement | null) => {
    // Track the mounted active card so drag gestures can measure its width.
    // Never clear on `null`: an exiting clone unmounts after its replacement
    // has attached and must not clobber the live reference.
    if (active && node !== null) {
      assignRef(interactions.activeCardRef, node);
    }

    assignRef(consumerRef, node);
  };

  const handleDrag = (event: PointerLikeEvent, info: PanInfo) => {
    interactions.handleDrag(event, info);

    if (!reduceMotion) {
      tilt.jump(getDragTilt(info.offset.x, idleRotate));
    }
  };

  const handleDragEnd = (event: PointerLikeEvent, info: PanInfo) => {
    animate(tilt, 0, CARD_ROTATE_SPRING);
    interactions.handleDragEnd(event, info);
  };

  return (
    <m.div
      {...cardProps}
      animate={{
        opacity: 1,
        rotate: idleRotate,
        scale: response.rest.scale,
        y: response.rest.y,
        zIndex: stack.visibleCount - depth,
      }}
      aria-hidden={active ? undefined : true}
      className={joinClassNames("patternmode-deck-card", cardProps.className)}
      custom={stack.exitCustom}
      data-active={active ? "true" : "false"}
      data-depth={depth}
      data-direction={lastDirection ?? undefined}
      drag={draggable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={stack.dragElastic}
      dragMomentum={true}
      dragTransition={{
        bounceDamping: 22,
        bounceStiffness: 300,
        power: 0.3,
        timeConstant: 350,
      }}
      exit="exit"
      inert={active ? undefined : true}
      initial={getCardEnterInitial(entering, reduceMotion, idleRotate, response.rest)}
      onDrag={draggable ? handleDrag : undefined}
      onDragEnd={draggable ? handleDragEnd : undefined}
      onDragStart={draggable ? interactions.handleDragStart : undefined}
      ref={attachCardRef}
      role={getCardRole(item)}
      style={style}
      transition={{
        default: CARD_DEFAULT_SPRING,
        opacity: { duration: 0.2, ease: "easeOut" },
        rotate: CARD_ROTATE_SPRING,
        scale: CARD_SCALE_SPRING,
        y: CARD_Y_SPRING,
      }}
      variants={cardExitVariants}
      whileDrag={draggable ? { cursor: "grabbing", scale: reduceMotion ? 1 : 1.02 } : undefined}
    >
      {cardProps.children}
      {stack.renderOverlay?.({
        active,
        depth,
        direction: lastDirection,
        index: stack.activeIndex + depth,
        itemId: item.id,
      })}
    </m.div>
  );
};
