"use client";

import { useApertoGroup } from "../aperto-group-context";
import { ApertoTrigger } from "../aperto-trigger";
import { ApertoThumbnailMedia } from "../media-rendering";
import { getMediaLabel } from "../media-utils";
import type { ApertoThumbnailProps } from "./ApertoTypes";

export function ApertoThumbnail({
  children,
  className,
  index,
}: ApertoThumbnailProps) {
  const group = useApertoGroup();
  const media = group.media[index];

  if (!media) {
    return null;
  }

  return (
    <ApertoTrigger
      active={group.index === index}
      aria-label={`Open ${getMediaLabel(media)}`}
      className={className ?? group.classNames?.thumbnail}
      onClick={() => group.openAtIndex(index)}
      ref={(node) => group.registerThumbnail(index, node)}
      sharedLayoutId={false}
    >
      {children ?? (
        <ApertoThumbnailMedia
          item={media}
          renderImage={group.renderImage}
          renderVideo={group.renderVideo}
        />
      )}
    </ApertoTrigger>
  );
}
