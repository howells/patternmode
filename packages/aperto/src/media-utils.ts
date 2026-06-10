import type { ApertoMediaItem } from "./types";

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
