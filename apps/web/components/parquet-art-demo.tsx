"use client";

import { Parquet } from "@patternmode/parquet";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ART_PALETTES } from "@/lib/art-palettes";

const ROTATION_MS = 5200;
const MAX_SLOTS = Math.max(...ART_PALETTES.map((palette) => palette.colors.length));
// A tile must clear this much of the mosaic (percent) before it earns a label.
const LABEL_MIN_WIDTH = 20;
const LABEL_MIN_HEIGHT = 14;

export const ParquetArtDemo = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ART_PALETTES.length);
    }, ROTATION_MS);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const art = ART_PALETTES[index] ?? ART_PALETTES[0];
  if (art === undefined) {
    return null;
  }

  return (
    <div className="parquet-art">
      <div className="parquet-art-body">
        <figure className="parquet-art-figure">
          {ART_PALETTES.map((palette, imageIndex) => (
            <Image
              alt=""
              className="parquet-art-image"
              data-active={imageIndex === index ? "" : undefined}
              fill
              key={palette.image}
              priority={imageIndex === 0}
              sizes="(max-width: 640px) 90vw, 360px"
              src={palette.image}
            />
          ))}
        </figure>

        <div className="parquet-art-mosaic">
          <Parquet
            aspectRatio={1}
            colors={art.colors}
            renderTile={(tile, meta) =>
              meta.width >= LABEL_MIN_WIDTH && meta.height >= LABEL_MIN_HEIGHT ? (
                <span className="parquet-art-chip" data-light={meta.isLight ? "" : undefined}>
                  <span className="parquet-art-hex">{tile.color.toUpperCase()}</span>
                  <span className="parquet-art-name">{tile.label}</span>
                </span>
              ) : null
            }
            slotCount={MAX_SLOTS}
          />
        </div>
      </div>

      <footer className="parquet-art-footer">
        <div aria-label="Artwork" className="parquet-art-dots" role="tablist">
          {ART_PALETTES.map((palette, dotIndex) => (
            <button
              aria-label={palette.title}
              aria-selected={dotIndex === index}
              className="parquet-art-dot"
              data-active={dotIndex === index ? "" : undefined}
              key={palette.image}
              onClick={() => {
                setIndex(dotIndex);
              }}
              role="tab"
              type="button"
            />
          ))}
        </div>
        <span className="parquet-art-credit">{art.credit}</span>
      </footer>
    </div>
  );
};
