import { ApiTable, CodeBlock, ComponentDocsShell, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { ParquetArtDemo } from "@/components/parquet-art-demo";

export const metadata: Metadata = {
  description:
    "A proportional color mosaic that re-tiles and morphs as a palette's weights change.",
  title: "Parquet | Patternmode",
};

const parquetApi: ApiSection[] = [
  {
    description: "A controlled, proportional color mosaic. Each tile's area encodes its weight.",
    name: "Parquet",
    props: [
      {
        description:
          "Weighted colors to pack. Each tile extends WeightedColorSegment ({ color, value, label? }). The mosaic re-tiles and morphs whenever this changes.",
        name: "colors",
        type: "ParquetTile[]",
      },
      {
        defaultValue: "4 / 3",
        description: "Aspect ratio (width / height) of the mosaic.",
        name: "aspectRatio",
        type: "number",
      },
      {
        defaultValue: "10",
        description: "Gap between tiles, in the mosaic's internal layout units.",
        name: "gap",
        type: "number",
      },
      {
        defaultValue: "colors.length",
        description:
          "Fixed number of tile slots. Render a stable count so morphs between palettes of different lengths stay smooth; extra slots collapse to nothing.",
        name: "slotCount",
        type: "number",
      },
      {
        defaultValue: "false",
        description:
          "Show the built-in label (color name + derived percentage) on hover, with a contrast-aware foreground.",
        name: "showLabels",
        type: "boolean",
      },
      {
        description:
          "Replace the built-in label with custom content. Receives the tile and its derived { percent, isLight, slot }.",
        name: "renderTile",
        type: "(tile, meta) => ReactNode",
      },
      {
        defaultValue: "false",
        description: "Disable enter and morph animation. prefers-reduced-motion also disables it.",
        name: "disableMotion",
        type: "boolean",
      },
    ],
  },
];

const parquetExample = `import { Parquet } from "@patternmode/parquet";
import "@patternmode/parquet/styles.css";

const palette = [
  { color: "#c2703e", value: 0.42, label: "Terracotta" },
  { color: "#2d5a27", value: 0.28, label: "Forest" },
  { color: "#1b2a4a", value: 0.18, label: "Navy" },
  { color: "#e8b4b8", value: 0.12, label: "Blush" },
];

export function Palette() {
  // Re-tiles and morphs whenever \`colors\` changes.
  return <Parquet colors={palette} showLabels />;
}`;

export default function ParquetPage() {
  return (
    <ComponentDocsShell
      description="A two-dimensional, read-only view of a weighted color distribution — the proportional-area counterpart to a distribution bar. The largest weight always holds the first slot, so changing the palette morphs the biggest tile to the new biggest tile."
      title="Parquet"
    >
      <ParquetArtDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/parquet</CodeBlock>
        <CodeBlock>{parquetExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={parquetApi} />
      </DocsBlock>
    </ComponentDocsShell>
  );
}
