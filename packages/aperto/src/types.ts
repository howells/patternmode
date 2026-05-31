/**
 * @patternmode/aperto
 *
 * Shared element transitions with physics-based drag dismissal.
 * Built on Radix Dialog + Motion.
 *
 * Inspired by Cambio (https://github.com/raphaelsalaja/cambio)
 * by Raphael Salaja. Reimplemented for Radix UI primitives.
 */

import type { Transition } from "motion/react";
import type { ImgHTMLAttributes, ReactNode, VideoHTMLAttributes } from "react";

interface BaseMediaItem {
  description?: string;
  height?: number;
  id?: string;
  src: string;
  thumbnailSrc?: string;
  title?: string;
  width?: number;
}

export interface ApertoImageItem extends BaseMediaItem {
  alt: string;
  type: "image";
}

export interface ApertoVideoItem extends BaseMediaItem {
  alt?: string;
  captionsSrc?: string;
  poster?: string;
  thumbnailSrc: string;
  type: "video";
}

export type ApertoMediaItem = ApertoImageItem | ApertoVideoItem;

export type RenderImage = (
  props: ImgHTMLAttributes<HTMLImageElement> & {
    item: ApertoImageItem;
    variant: "expanded" | "thumbnail";
  }
) => ReactNode;

export type RenderVideo = (
  props: VideoHTMLAttributes<HTMLVideoElement> & {
    item: ApertoVideoItem;
    variant: "expanded" | "thumbnail";
  }
) => ReactNode;

export interface ApertoClassNames {
  closeButton?: string;
  content?: string;
  counter?: string;
  nextButton?: string;
  overlay?: string;
  previousButton?: string;
  thumbnail?: string;
}

/** Named motion preset */
export type MotionPresetName = "snappy" | "smooth" | "bouncy" | "reduced";

/** Expanded media navigation transition preset */
export type NavigationMotionPresetName = "float" | "glide" | "snap";

/** Per-component motion variant overrides */
export interface MotionVariants {
  backdrop?: MotionPresetName;
  content?: MotionPresetName;
  trigger?: MotionPresetName;
}

/** Motion prop: a single preset name, per-component variants, or nothing */
export type MotionProp = MotionPresetName | MotionVariants;

/** Spring config for drag physics */
export interface DragSpringConfig {
  damping: number;
  restDelta: number;
  stiffness: number;
}

/** Resolved preset with transition timing and drag physics */
export interface MotionPreset {
  drag: DragSpringConfig;
  transition: Transition;
}

/** Dismissal behaviour config */
export interface DismissibleConfig {
  /** Distance in px to trigger dismissal (default: 100) */
  threshold?: number;
  /** Velocity in px/s to trigger dismissal (default: 500) */
  velocity?: number;
}

/** Context value shared between all Aperto components */
export interface ApertoContextValue {
  dismissible: boolean | DismissibleConfig;
  layoutId: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  preset: MotionPreset;
  presetName: MotionPresetName;
  reduceMotion: boolean;
  variants?: MotionVariants;
}
