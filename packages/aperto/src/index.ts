"use client";

/**
 * @patternmode/aperto
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

import {
	ApertoGroup,
	type ApertoGroupProps,
	type ApertoProps,
	ApertoSingle,
	ApertoThumbnail,
	type ApertoThumbnailProps,
} from "./aperto";
import { ApertoClose } from "./aperto-close";
import { ApertoContent, type ApertoContentProps } from "./aperto-content";
import { ApertoDescription } from "./aperto-description";
import { ApertoOverlay, type ApertoOverlayProps } from "./aperto-overlay";
import { ApertoPortal, type ApertoPortalProps } from "./aperto-portal";
import { ApertoRoot, type ApertoRootProps } from "./aperto-root";
import { ApertoTitle } from "./aperto-title";
import { ApertoTrigger, type ApertoTriggerProps } from "./aperto-trigger";

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
export {
	Aperto,
	ApertoClose,
	ApertoContent,
	type ApertoContentProps,
	ApertoDescription,
	ApertoGroup,
	type ApertoGroupProps,
	ApertoOverlay,
	type ApertoOverlayProps,
	ApertoPortal,
	type ApertoPortalProps,
	ApertoPrimitive,
	type ApertoProps,
	ApertoRoot,
	type ApertoRootProps,
	ApertoThumbnail,
	type ApertoThumbnailProps,
	ApertoTitle,
	ApertoTrigger,
	type ApertoTriggerProps,
};
