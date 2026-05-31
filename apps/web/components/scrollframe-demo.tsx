"use client";

import { ScrollFrame } from "@patternmode/scrollframe";
import { useState } from "react";

const notes = [
  "Selection state remains visible while the surrounding page stays still.",
  "Fades disappear at the exact edge instead of being hard-coded decoration.",
  "Native scrolling keeps trackpad, keyboard, and touch behavior predictable.",
  "Horizontal strips use the same primitive as vertical panels.",
  "Consumers can hide scrollbars without losing measured edge state.",
  "Content can be cards, rows, forms, menus, or any custom layout.",
];

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

export function ScrollFrameDemo() {
  const [selectedChip, setSelectedChip] = useState(chips[0]);

  return (
    <div className="scrollframe-demo">
      <ScrollFrame
        aria-label="Implementation notes"
        className="scrollframe-demo-panel"
        fadeColor="var(--surface)"
        viewportClassName="scrollframe-demo-viewport"
      >
        <div className="scrollframe-demo-list">
          {notes.map((note, index) => (
            <div className="scrollframe-demo-row" key={note}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{note}</p>
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
              onClick={() => setSelectedChip(chip)}
              type="button"
            >
              {chip}
            </button>
          ))}
        </div>
      </ScrollFrame>
    </div>
  );
}
