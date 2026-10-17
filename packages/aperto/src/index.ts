"use client";

/**
 * Package: @patternmode/aperto
 *
 * Opinionated thumbnail-to-expanded media transitions.
 * Built on Radix Dialog + Motion.
 *
 * Inspired by Cambio (https://github.com/raphaelsalaja/cambio)
 * by Raphael Salaja.
 *
 * @example
 * ```tsx
 * import { Aperto } from "@patternmode/aperto";
 *
 * import { Aperto } from "@patternmode/aperto";
 * import "@patternmode/aperto/styles.css";
 *
 * <Aperto.Group media={media}>
 *   {media.map((item, index) => (
 *     <Aperto.Thumbnail key={item.id ?? item.src} index={index} />
 *   ))}
 * </Aperto.Group>
 * ```
 */

import { ApertoGroup, ApertoSingle, ApertoThumbnail } from "./aperto";
import { ApertoClose } from "./aperto-close";
import { ApertoContent } from "./aperto-content";
import { ApertoDescription } from "./aperto-description";
import { ApertoOverlay } from "./aperto-overlay";
import { ApertoPortal } from "./aperto-portal";
import { ApertoRoot } from "./aperto-root";
import { ApertoTitle } from "./aperto-title";
import { ApertoTrigger } from "./aperto-trigger";

/** Lower-level compound component namespace for advanced composition. */
const ApertoPrimitive = {
  Close: ApertoClose,
  Content: ApertoContent,
  Description: ApertoDescription,
  Overlay: ApertoOverlay,
  Portal: ApertoPortal,
  Root: ApertoRoot,
  Title: ApertoTitle,
  Trigger: ApertoTrigger,
};

/** Primary media-first component namespace. */
const Aperto = Object.assign(ApertoSingle, {
  Group: ApertoGroup,
  Primitive: ApertoPrimitive,
  Thumbnail: ApertoThumbnail,
});

// Preset system
export { PRESETS, resolvePreset } from "./presets";
// Types
export type {
  ApertoClassNames,
  ApertoImageItem,
  ApertoMediaItem,
  ApertoVideoItem,
  DismissibleConfig,
  DragSpringConfig,
  MotionPreset,
  MotionPresetName,
  MotionProp,
  MotionVariants,
  NavigationMotionPresetName,
  RenderImage,
  RenderVideo,
} from "./types";
// Named exports for tree-shaking
export { Aperto, ApertoPrimitive };
export { ApertoGroup, ApertoThumbnail } from "./aperto";
export type { ApertoGroupProps, ApertoProps, ApertoThumbnailProps } from "./aperto";
export { ApertoClose } from "./aperto-close";
export { ApertoContent } from "./aperto-content";
export type { ApertoContentProps } from "./aperto-content";
export { ApertoDescription } from "./aperto-description";
export { ApertoOverlay } from "./aperto-overlay";
export type { ApertoOverlayProps } from "./aperto-overlay";
export { ApertoPortal } from "./aperto-portal";
export type { ApertoPortalProps } from "./aperto-portal";
export { ApertoRoot } from "./aperto-root";
export type { ApertoRootProps } from "./aperto-root";
export { ApertoTitle } from "./aperto-title";
export { ApertoTrigger } from "./aperto-trigger";
export type { ApertoTriggerProps } from "./aperto-trigger";
