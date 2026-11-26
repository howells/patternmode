import type { CSSProperties } from "react";
import type { ApertoMediaItem } from "./types";

export type ApertoExpandedMediaStyle = CSSProperties & {
  "--aperto-expanded-aspect-ratio"?: string;
  "--aperto-expanded-aspect-ratio-height"?: number;
  "--aperto-expanded-aspect-ratio-width"?: number;
};

export const getExpandedMediaStyle = (
  activeMedia: ApertoMediaItem | undefined,
): ApertoExpandedMediaStyle | undefined => {
  if (
    activeMedia === undefined ||
    activeMedia.width === undefined ||
    activeMedia.height === undefined
  ) {
    return undefined;
  }

  return {
    "--aperto-expanded-aspect-ratio": `${activeMedia.width} / ${activeMedia.height}`,
    "--aperto-expanded-aspect-ratio-height": activeMedia.height,
    "--aperto-expanded-aspect-ratio-width": activeMedia.width,
  };
};

export const getMediaLabel = (item: ApertoMediaItem): string => item.title ?? item.alt ?? "media";

export const getMediaKey = (item: ApertoMediaItem, index: number): string =>
  item.id ?? `${item.type}:${item.src}:${index}`;

export const getDescriptionProps = (
  item: ApertoMediaItem,
): {
  "aria-describedby"?: undefined;
} =>
  item.description === undefined || item.description === ""
    ? { "aria-describedby": undefined }
    : {};
