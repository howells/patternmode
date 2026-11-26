import type { ReactNode, Ref } from "react";

import { getExpandedMediaStyle } from "./media-utils";
import type { ApertoMediaItem } from "./types";

/**
 * The Expanded Media box shared by `Aperto` and `Aperto.Group`: the
 * `aperto-media` slot the stylesheet sizes, carrying the item's aspect ratio.
 */
export const ApertoMediaFrame = ({
  children,
  item,
  ref,
}: {
  children: ReactNode;
  item: ApertoMediaItem;
  ref?: Ref<HTMLDivElement>;
}) => (
  <div data-slot="aperto-media" ref={ref} style={getExpandedMediaStyle(item)}>
    {children}
  </div>
);
