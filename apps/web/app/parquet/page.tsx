import type { ApiSection } from "@howells/site-ui";

import { PackageDocs } from "@/components/package-docs";
import { ParquetDemo } from "@/components/parquet-demo";
import { ParquetVariants } from "@/components/parquet-variants";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("parquet");

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

<Parquet colors={palette} showLabels />`;

export default function ParquetPage() {
  return (
    <PackageDocs
      api={parquetApi}
      caption="The same array as a distribution bar and a list. Pick a colour to make it the largest tile."
      demo={<ParquetDemo />}
      example={parquetExample}
      installLead="The same array can drive a Swatch DistributionBar and a Parquet."
      slug="parquet"
      variants={<ParquetVariants />}
    />
  );
}
