import type { ReactNode } from "react";

import type {
  ApertoClassNames,
  ApertoMediaItem,
  DismissibleConfig,
  MotionPresetName,
  MotionVariants,
  NavigationMotionPresetName,
  RenderImage,
  RenderVideo,
} from "../types";

export interface ApertoProps {
  classNames?: ApertoClassNames;
  /**
   * Whether dragging can dismiss the expanded media.
   *
   * Default `true`.
   */
  dismissible?: boolean | DismissibleConfig;
  /** Single media item rendered by the standalone Aperto component. */
  media: ApertoMediaItem;
  /**
   * Overrides Aperto's plain `img` renderer for image media.
   *
   * Use this to render framework-specific image components such as Next.js
   * `Image` while keeping Aperto itself framework agnostic.
   */
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}

export interface ApertoGroupProps {
  children: ReactNode;
  classNames?: ApertoClassNames;
  /**
   * Whether dragging can dismiss the expanded media.
   *
   * Default `true`.
   */
  dismissible?: boolean | DismissibleConfig;
  /** Controlled active media index. Pair with `onIndexChange`. */
  index?: number;
  /**
   * Initial active media index for uncontrolled groups.
   *
   * Default `0`.
   */
  initialIndex?: number;
  media: ApertoMediaItem[];
  /**
   * Motion preset for open/close transitions, or per-part motion overrides.
   *
   * Default `"smooth"`.
   */
  motion?: MotionPresetName | MotionVariants;
  /**
   * Motion preset for next/previous navigation inside expanded media.
   *
   * Default `"glide"`.
   */
  navigationMotion?: NavigationMotionPresetName;
  /** Called whenever grouped media navigation changes the active index. */
  onIndexChange?: (index: number) => void;
  /**
   * Overrides Aperto's plain `img` renderer for image media.
   *
   * Use this to render framework-specific image components such as Next.js
   * `Image` while keeping Aperto itself framework agnostic.
   */
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}

export interface ApertoThumbnailProps {
  /** Optional custom thumbnail content; defaults to media thumbnail rendering. */
  children?: ReactNode;
  className?: string;
  /** Index into the parent group's `media` array. */
  index: number;
}
