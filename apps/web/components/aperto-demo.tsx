"use client";

import { Aperto } from "@patternmode/aperto";
import type { ApertoMediaItem } from "@patternmode/aperto";

import { renderApertoImage } from "@/components/aperto-image";
import "./aperto-demo.css";

export const ApertoDemo = ({ media }: { media: ApertoMediaItem[] }) => (
  <Aperto.Group
    classNames={{ thumbnail: "aperto-thumb" }}
    media={media}
    renderImage={renderApertoImage}
  >
    <div className="aperto-grid">
      {media.map((item, index) => (
        <Aperto.Thumbnail key={item.id ?? item.src} index={index} />
      ))}
    </div>
  </Aperto.Group>
);
