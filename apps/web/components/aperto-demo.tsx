"use client";

import {
  Aperto,
  type ApertoMediaItem,
  type MotionPresetName,
  type NavigationMotionPresetName,
} from "@patternmode/aperto";
import type { CSSProperties } from "react";
import { useState } from "react";

import { OptionBar } from "./option-bar";

export type CatalogMediaItem = ApertoMediaItem;

export function ApertoDemo({ media }: { media: CatalogMediaItem[] }) {
  const [columns, setColumns] = useState(3);
  const [easing, setEasing] = useState<MotionPresetName>("smooth");
  const [navigationMotion, setNavigationMotion] =
    useState<NavigationMotionPresetName>("glide");
  const [radius, setRadius] = useState(6);
  const visibleMedia = columns === 2 ? media.slice(0, 4) : media;

  return (
    <div className="aperto-demo">
      <div style={{ "--aperto-radius": `${radius}px` } as CSSProperties}>
        <Aperto.Group
          classNames={{ thumbnail: "aperto-thumb" }}
          key={columns}
          media={visibleMedia}
          motion={easing}
          navigationMotion={navigationMotion}
        >
          <div className="aperto-grid" data-columns={columns}>
            {visibleMedia.map((item, index) => (
              <Aperto.Thumbnail key={item.id ?? item.src} index={index} />
            ))}
          </div>
        </Aperto.Group>
      </div>

      <div className="aperto-controls">
        <OptionBar
          label="Easing"
          onChange={setEasing}
          options={[
            { label: "Snappy", value: "snappy" as const },
            { label: "Smooth", value: "smooth" as const },
            { label: "Bouncy", value: "bouncy" as const },
          ]}
          value={easing}
        />
        <OptionBar
          label="Navigation"
          onChange={setNavigationMotion}
          options={[
            { label: "Float", value: "float" as const },
            { label: "Glide", value: "glide" as const },
            { label: "Snap", value: "snap" as const },
          ]}
          value={navigationMotion}
        />
        <OptionBar
          label="Columns"
          onChange={setColumns}
          options={[
            { label: "2", value: 2 },
            { label: "3", value: 3 },
          ]}
          value={columns}
        />
        <OptionBar
          label="Radius"
          onChange={setRadius}
          options={[
            { label: "0", value: 0 },
            { label: "6", value: 6 },
            { label: "12", value: 12 },
          ]}
          value={radius}
        />
      </div>
    </div>
  );
}
