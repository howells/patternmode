import { createContext, use } from "react";

import type { ApertoClassNames, ApertoMediaItem, RenderImage, RenderVideo } from "./types";

export interface ApertoGroupContextValue {
  classNames?: ApertoClassNames;
  index: number;
  media: ApertoMediaItem[];
  openAtIndex: (index: number) => void;
  registerThumbnail: (index: number, node: HTMLButtonElement | null) => void;
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}

export const ApertoGroupContext = createContext<ApertoGroupContextValue | null>(null);

export const useApertoGroup = (): ApertoGroupContextValue => {
  const ctx = use(ApertoGroupContext);
  if (!ctx) {
    throw new Error("Aperto.Thumbnail must be used within <Aperto.Group>");
  }
  return ctx;
};
