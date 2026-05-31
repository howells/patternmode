import {
  type ApiSection,
  ApiTable,
  CodeBlock,
  ComponentPage,
  DocsBlock,
} from "@howells/site-ui";
import type { Metadata } from "next";

import { SwatchDemo } from "@/components/swatch-demo";

export const metadata: Metadata = {
  title: "Swatch | Patternmode",
  description:
    "Color, gradient, image, and weighted palette swatches with selection, remove, unavailable, and contrast-aware states.",
};

const swatchApi: ApiSection[] = [
  {
    name: "Swatch",
    description:
      "Visual swatch primitive for solid colors, gradients, images, and weighted palettes.",
    props: [
      {
        name: "color",
        type: "string",
        description: "CSS color value used for a solid swatch fill.",
      },
      {
        name: "background",
        type: "string",
        description:
          "CSS background shorthand. Takes precedence over color and colors.",
      },
      {
        name: "colors",
        type: "Array<string | { color: string; ratio?: number }>",
        description:
          "Renders multiple color stops as one weighted palette fill.",
      },
      {
        name: "shape",
        type: '"circle" | "pill" | "square" | "block"',
        defaultValue: '"circle"',
        description: "Controls the rendered silhouette.",
      },
      {
        name: "flat",
        type: "boolean",
        defaultValue: "false",
        description:
          "Removes decorative shadow and scrim so the fill reads as an exact visual value.",
      },
      {
        name: "texture",
        type: '"atmosphere"',
        description:
          "Renders supplied colors as a qualitative atmosphere texture instead of a weighted palette.",
      },
      {
        name: "density",
        type: "number",
        defaultValue: "0.5",
        description:
          "Controls how tight or diffuse atmosphere texture pools appear.",
      },
      {
        name: "gravity",
        type: "number",
        defaultValue: "0",
        description:
          "Shifts atmosphere texture pools vertically without changing the visual value.",
      },
      {
        name: "size",
        type: '"2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"',
        defaultValue: '"base"',
        description: "Sets the swatch dimensions.",
      },
      {
        name: "selected",
        type: "boolean",
        defaultValue: "false",
        description: "Shows selected state and optional icon overlay.",
      },
      {
        name: "onRemove",
        type: "() => void",
        description: "Adds a hover/focus remove affordance.",
      },
      {
        name: "removeLabel",
        type: "string",
        description:
          "Accessible label for the remove affordance. Defaults to the swatch label.",
      },
    ],
  },
  {
    name: "DistributionBar",
    description:
      "Sibling primitive for editing weighted visual distributions with draggable boundary handles.",
    props: [
      {
        name: "segments",
        type: "Array<{ id: string; color: string; label?: string; value: number }>",
        description:
          "Segment weights and colors. Values render proportionally, and the legend shows derived percentages.",
      },
      {
        name: "onChange",
        type: "(segments) => void",
        description:
          "Called with the next segment values after drag or keyboard adjustment.",
      },
      {
        name: "minValue",
        type: "number",
        defaultValue: "4",
        description:
          "Smallest value each adjacent segment can be dragged down to.",
      },
      {
        name: "step",
        type: "number",
        defaultValue: "1",
        description: "Keyboard adjustment amount for ArrowLeft and ArrowRight.",
      },
      {
        name: "legend",
        type: '"segments" | false',
        defaultValue: '"segments"',
        description:
          "Shows or hides the per-segment derived percentage legend.",
      },
      {
        name: "moveDistributionBoundary",
        type: "(segments, boundaryIndex, deltaValue, minValue) => segments",
        description:
          "Helper for external controls that need to move a boundary without dragging.",
      },
      {
        name: "updateDistributionSegment",
        type: "(segments, id, update) => segments",
        description:
          "Updates segment metadata such as id, color, or label while preserving its current value.",
      },
      {
        name: "removeDistributionSegment",
        type: "(segments, id) => segments",
        description:
          "Removes a segment and redistributes its value across the remaining segments.",
      },
    ],
  },
  {
    name: "DistributionDisplay",
    description:
      "Non-editing distribution primitive for read-only or selectable weighted visual displays.",
    props: [
      {
        name: "segments",
        type: "Array<{ id: string; color: string; label?: string; value: number }>",
        description:
          "Segment weights and colors. Values render proportionally without drag handles.",
      },
      {
        name: "emptyValue",
        type: "number",
        defaultValue: "0",
        description:
          "Optional unassigned weight rendered as a hatched remainder segment.",
      },
      {
        name: "legend",
        type: '"segments" | "summary" | false',
        defaultValue: '"segments"',
        description:
          "Controls whether the legend lists each segment, summarizes assigned/unassigned weight, or is hidden.",
      },
      {
        name: "onSegmentSelect",
        type: "(segment) => void",
        description:
          "Renders segments as buttons and reports which segment the parent selected.",
      },
      {
        name: "selectedSegmentId",
        type: "string",
        description:
          "Marks the selected segment when DistributionDisplay is used for selection.",
      },
    ],
  },
];

const swatchExample = `import {
  DistributionBar,
  DistributionDisplay,
  Swatch,
} from "@patternmode/swatch";
import "@patternmode/swatch/styles.css";
import { useState } from "react";

function PalettePreview() {
  const [segments, setSegments] = useState([
    { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 48 },
    { id: "saffron", color: "#d9a441", label: "Saffron", value: 30 },
    { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 22 },
  ]);

  return (
    <>
      <Swatch
        aria-label="Palette"
        colors={[
          { color: "#315c4b", ratio: 60 },
          { color: "#e1ebe5", ratio: 40 },
        ]}
        shape="pill"
        size="2xl"
      />
      <DistributionBar
        aria-label="Finish distribution"
        onChange={setSegments}
        segments={segments}
      />
      <DistributionDisplay
        aria-label="Assigned finish distribution: 79% assigned, 21% unassigned"
        emptyValue={21}
        legend="summary"
        segments={[
          { id: "evergreen", color: "#315c4b", label: "Evergreen", value: 38 },
          { id: "saffron", color: "#d9a441", label: "Saffron", value: 24 },
          { id: "oxblood", color: "#9b3d32", label: "Oxblood", value: 17 },
        ]}
      />
    </>
  );
}`;

export default function SwatchPage() {
  return (
    <ComponentPage
      description="Color, gradient, image, and weighted palette swatches with selection, remove, unavailable, and contrast-aware states."
      title="Swatch"
    >
      <SwatchDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/swatch</CodeBlock>
        <CodeBlock>{swatchExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={swatchApi} />
      </DocsBlock>
    </ComponentPage>
  );
}
