"use client";

import { ScrollFrame } from "@patternmode/scrollframe";
import { useState } from "react";

const activity = [
  ["Pushed sheet", "09:41"],
  ["Palette saved", "09:38"],
  ["Tag added", "09:12"],
  ["Image opened", "08:57"],
  ["Deck finished", "08:40"],
  ["Swatch renamed", "08:22"],
  ["Colour picked", "08:05"],
  ["Thumbnail cropped", "07:51"],
] as const;

const chips = [
  "Granite",
  "Basalt",
  "Limestone",
  "Oak",
  "Walnut",
  "Cork",
  "Linen",
  "Wool",
  "Marble",
  "Slate",
  "Sandstone",
  "Travertine",
  "Cedar",
  "Birch",
  "Teak",
  "Copper",
  "Brass",
  "Concrete",
];

export const ScrollFrameDemo = () => {
  const [selectedChip, setSelectedChip] = useState(chips[0]);

  return (
    <div className="scrollframe-demo">
      <ScrollFrame
        aria-label="Activity"
        className="scrollframe-demo-panel"
        fadeColor="var(--surface)"
        viewportClassName="scrollframe-demo-viewport"
      >
        <div className="scrollframe-demo-list">
          {activity.map(([label, time]) => (
            <div className="scrollframe-demo-row" key={label}>
              <span>{label}</span>
              <span>{time}</span>
            </div>
          ))}
        </div>
      </ScrollFrame>

      <ScrollFrame
        aria-label="Material filters"
        axes="horizontal"
        className="scrollframe-demo-strip"
        controls
        dragScroll
        fadeColor="var(--surface)"
        scrollbars="hidden"
      >
        <div className="scrollframe-demo-chips">
          {chips.map((chip) => (
            <button
              aria-pressed={selectedChip === chip}
              key={chip}
              onClick={() => {
                setSelectedChip(chip);
              }}
              type="button"
            >
              {chip}
            </button>
          ))}
        </div>
      </ScrollFrame>
    </div>
  );
};
