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
  /** Whether dragging can dismiss the expanded media (default: true). */
  dismissible?: boolean | DismissibleConfig;
  media: ApertoMediaItem;
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}

export interface ApertoGroupProps {
  children: ReactNode;
  classNames?: ApertoClassNames;
  /** Whether dragging can dismiss the expanded media (default: true). */
  dismissible?: boolean | DismissibleConfig;
  index?: number;
  initialIndex?: number;
  media: ApertoMediaItem[];
  /** Motion preset for open/close transitions */
  motion?: MotionPresetName | MotionVariants;
  navigationMotion?: NavigationMotionPresetName;
  onIndexChange?: (index: number) => void;
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}

export interface ApertoThumbnailProps {
  children?: ReactNode;
  className?: string;
  index: number;
}
