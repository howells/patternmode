"use client";

import { ScrollFrame } from "@patternmode/scrollframe";
import Image from "next/image";
import "./scrollframe-demo.css";

const studies = [
  ["Light study", "light-study"],
  ["Warm chamber", "warm-chamber"],
  ["Concrete room", "concrete-room"],
  ["Slit window", "slit-window"],
  ["Earth corridor", "earth-corridor"],
  ["Rammed light", "rammed-light"],
  ["Sample row", "sample-row"],
] as const;

const photos = studies.slice(0, 5);

/* Both frames open partway down and along, so each shows a fade at both edges. */
const openPartwayDown = (node: HTMLDivElement | null) => {
  if (node !== null) {
    node.scrollTop = 22;
  }
};

const openPartwayAlong = (node: HTMLDivElement | null) => {
  if (node !== null) {
    node.scrollLeft = 96;
  }
};

export const ScrollFrameDemo = () => (
  <div className="scrollframe-demo">
    <ScrollFrame
      aria-label="Studies"
      className="scrollframe-demo-list"
      fadeColor="var(--card)"
      viewportRef={openPartwayDown}
    >
      {studies.map(([name], index) => (
        <div className="scrollframe-demo-row" key={name}>
          <span className="type-ui">{name}</span>
          <span className="type-data text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </ScrollFrame>

    <ScrollFrame.Root
      aria-label="Photographs"
      axes="horizontal"
      className="scrollframe-demo-strip"
      controlVisibility="disabled"
      dragScroll
      fadeColor="var(--muted)"
      scrollbars="hidden"
      scrollStep="page"
    >
      <ScrollFrame.Viewport
        contentClassName="scrollframe-demo-photos"
        viewportRef={openPartwayAlong}
      >
        {photos.map(([name, file]) => (
          <Image
            alt={name}
            className="scrollframe-demo-photo"
            draggable={false}
            height={848}
            key={file}
            sizes="160px"
            src={`/media/${file}.jpg`}
            width={1264}
          />
        ))}
      </ScrollFrame.Viewport>
      <ScrollFrame.Fade axis="horizontal" edge="start" />
      <ScrollFrame.Fade axis="horizontal" edge="end" />
      <ScrollFrame.Previous />
      <ScrollFrame.Next />
    </ScrollFrame.Root>
  </div>
);
