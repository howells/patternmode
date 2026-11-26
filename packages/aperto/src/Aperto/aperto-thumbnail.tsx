"use client";

import { useCallback } from "react";

import { useApertoGroup } from "../aperto-group-context";
import { ApertoTrigger } from "../aperto-trigger";
import { ApertoThumbnailMedia } from "../media-rendering";
import { getMediaLabel } from "../media-utils";
import type { ApertoThumbnailProps } from "./aperto-types";

export const ApertoThumbnail = ({ children, className, index }: ApertoThumbnailProps) => {
  const group = useApertoGroup();
  const media = group.media[index];
  const { registerThumbnail } = group;
  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- an inline ref callback makes React 19 call ref(null) then ref(node) on every render; the library build does not run React Compiler.
  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      registerThumbnail(index, node);
    },
    [index, registerThumbnail],
  );

  if (!media) {
    return null;
  }

  return (
    <ApertoTrigger
      active={group.index === index}
      aria-label={`Open ${getMediaLabel(media)}`}
      className={className ?? group.classNames?.thumbnail}
      onClick={() => {
        group.openAtIndex(index);
      }}
      ref={setRef}
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
};
