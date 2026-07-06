import { createElement } from "react";
import type { ReactNode } from "react";

import type { ApertoMediaItem, RenderImage, RenderVideo } from "./types";

const renderDefaultImage = (props: Parameters<RenderImage>[0]): ReactNode => {
  const { item: _item, variant: _variant, ...imageProps } = props;
  return createElement("img", { ...imageProps, alt: imageProps.alt ?? "" });
};

const renderDefaultVideo = (props: Parameters<RenderVideo>[0]): ReactNode => {
  const { item: _item, variant, ...videoProps } = props;
  if (variant === "thumbnail") {
    return createElement("img", {
      alt: videoProps["aria-label"] ?? "",
      src: props.item.thumbnailSrc,
    });
  }
  return (
    <video {...videoProps}>
      <track kind="captions" src={props.item.captionsSrc ?? "data:text/vtt,"} />
    </video>
  );
};

export const ApertoThumbnailMedia = ({
  item,
  renderImage,
  renderVideo,
}: {
  item: ApertoMediaItem;
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}): ReactNode => {
  if (item.type === "image") {
    const imageProps: Parameters<RenderImage>[0] = {
      alt: "",
      height: item.height,
      item,
      src: item.thumbnailSrc ?? item.src,
      variant: "thumbnail",
      width: item.width,
    };
    return (renderImage ?? renderDefaultImage)(imageProps);
  }

  const videoProps: Parameters<RenderVideo>[0] = {
    "aria-label": item.alt ?? item.title ?? "Video thumbnail",
    height: item.height,
    item,
    poster: item.poster,
    src: item.thumbnailSrc,
    variant: "thumbnail",
    width: item.width,
  };
  return (renderVideo ?? renderDefaultVideo)(videoProps);
};

export const ApertoExpandedMedia = ({
  item,
  renderImage,
  renderVideo,
}: {
  item: ApertoMediaItem;
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}): ReactNode => {
  if (item.type === "image") {
    const imageProps: Parameters<RenderImage>[0] = {
      alt: item.alt,
      height: item.height,
      item,
      src: item.src,
      variant: "expanded",
      width: item.width,
    };
    return (renderImage ?? renderDefaultImage)(imageProps);
  }

  const videoProps: Parameters<RenderVideo>[0] = {
    "aria-label": item.alt ?? item.title ?? "Video",
    controls: true,
    height: item.height,
    item,
    poster: item.poster,
    src: item.src,
    variant: "expanded",
    width: item.width,
  };
  return (renderVideo ?? renderDefaultVideo)(videoProps);
};

export const ApertoTransitionMedia = ({
  item,
  renderImage,
  renderVideo,
}: {
  item: ApertoMediaItem;
  renderImage?: RenderImage;
  renderVideo?: RenderVideo;
}): ReactNode => {
  if (item.type === "image") {
    const imageProps: Parameters<RenderImage>[0] = {
      alt: item.alt,
      height: item.height,
      item,
      // The clone flies with the thumbnail's pixels — they are already decoded
      // and on screen, so the shared element stays seamless in flight. Using
      // the full-size `src` here makes the morph pop to a blank/half-loaded
      // frame whenever the expanded asset differs from the thumbnail and has
      // not finished loading yet. `variant: "thumbnail"` matters for the same
      // reason: consumers key srcset/sizes off the variant, and only the
      // thumbnail variant reproduces the exact URL the browser already has in
      // cache.
      src: item.thumbnailSrc ?? item.src,
      variant: "thumbnail",
      width: item.width,
    };
    return (renderImage ?? renderDefaultImage)(imageProps);
  }

  const videoProps: Parameters<RenderVideo>[0] = {
    "aria-label": item.alt ?? item.title ?? "Video",
    height: item.height,
    item,
    poster: item.poster,
    src: item.src,
    variant: "expanded",
    width: item.width,
  };
  return (renderVideo ?? renderDefaultVideo)(videoProps);
};
