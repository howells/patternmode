"use client";

import { Parquet } from "@patternmode/parquet";
import { useEffect, useState } from "react";

import { ART_PALETTES } from "@/lib/art-palettes";

const ROTATION_MS = 5200;
const MAX_SLOTS = Math.max(...ART_PALETTES.map((palette) => palette.colors.length));

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
      <header className="parquet-art-header">
        <span className="parquet-art-artist">{art.artist}</span>
        <span className="parquet-art-title">{art.title}</span>
        <span className="parquet-art-year">{art.year}</span>
      </header>

      <div className="parquet-art-body">
        <figure className="parquet-art-figure">
          {/* biome-ignore lint/performance/noImgElement: static public-domain asset, no optimization needed */}
          <img alt={`${art.title} — ${art.artist}`} src={art.image} />
        </figure>

        <div className="parquet-art-mosaic">
          <Parquet
            aspectRatio={1.36}
            colors={art.colors}
            renderTile={(tile, meta) => (
              <span className="parquet-art-chip" data-light={meta.isLight ? "" : undefined}>
                <span className="parquet-art-hex">{tile.color.toUpperCase()}</span>
                <span className="parquet-art-name">{tile.label}</span>
              </span>
            )}
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
