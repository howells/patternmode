"use client";

import { Aperto } from "@patternmode/aperto";
import type { ApertoImageItem, ApertoMediaItem } from "@patternmode/aperto";
import type { ComponentProps, ReactNode } from "react";

import { renderApertoImage } from "@/components/aperto-image";
import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import { apertoMedia } from "@/lib/aperto-media";
import "./aperto-demo.css";

const pick = (id: string): ApertoImageItem => {
  const item = apertoMedia.find((candidate) => candidate.id === id);
  if (item === undefined) {
    throw new Error(`No media item ${id}`);
  }
  return item;
};

const lead = pick("light-study");
const second = pick("rammed-light");
const third = pick("slit-window");
const fourth = pick("concrete-room");
const fifth = pick("warm-chamber");

/** The group around a cell's thumbnails, so each one opens for real. */
const Chips = ({
  children,
  media,
  small,
  ...props
}: {
  children?: ReactNode;
  media: ApertoMediaItem[];
  small?: boolean;
} & Omit<ComponentProps<typeof Aperto.Group>, "children" | "media">) => (
  <Aperto.Group classNames={{ thumbnail: "aperto-chip" }} media={media} {...props}>
    <div className="aperto-chips" data-small={small === true ? "" : undefined}>
      {children ??
        media.map((item, index) => <Aperto.Thumbnail key={item.id ?? item.src} index={index} />)}
    </div>
  </Aperto.Group>
);

export const ApertoVariants = () => (
  <VariantsBlock
    id="variants-title"
    lead="The panel takes its shape from each item's width and height, or 3:2 when they're missing."
  >
    <VariantCell code="no width, height" name="3:2 when unset">
      <Chips media={[lead]} />
    </VariantCell>
    <VariantCell code="width: 1, height: 1" name="Square panel">
      <Chips media={[{ ...second, height: 1, width: 1 }]} />
    </VariantCell>
    <VariantCell code='type: "video", poster' name="Video with a poster">
      <Chips
        media={[
          {
            alt: third.alt,
            poster: third.src,
            src: "/media/slit-window.mp4",
            thumbnailSrc: third.src,
            type: "video",
          },
        ]}
      />
    </VariantCell>
    <VariantCell code="dismissible={{ threshold, velocity }}" name="Drag down to dismiss">
      <Chips dismissible={{ threshold: 120, velocity: 600 }} media={[fourth]} />
    </VariantCell>
    <VariantCell code="after closing" name="Focus comes back here">
      <Chips media={[lead, fifth, second]} small />
    </VariantCell>
    <VariantCell code="renderImage" name="Your own image component">
      <Chips media={[third]} renderImage={renderApertoImage} />
    </VariantCell>
  </VariantsBlock>
);
