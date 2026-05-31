import type { ApertoMediaItem } from "./types";

export function getMediaLabel(item: ApertoMediaItem): string {
  return item.title ?? item.alt ?? "media";
}

export function getMediaKey(item: ApertoMediaItem, index: number): string {
  return item.id ?? `${item.type}:${item.src}:${index}`;
}

export function getDescriptionProps(item: ApertoMediaItem): {
  "aria-describedby"?: undefined;
} {
  return item.description ? {} : { "aria-describedby": undefined };
}
