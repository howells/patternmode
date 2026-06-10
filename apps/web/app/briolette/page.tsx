import { ApiTable, CodeBlock, ComponentDocsShell, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { BrioletteDemo } from "@/components/briolette-demo";

export const metadata: Metadata = {
  description:
    "Spinnable geodesic color sphere whose facets refine around each selection in OKLab.",
  title: "Briolette | Patternmode",
};

const brioletteApi: ApiSection[] = [
  {
    description:
      "Controlled hex picker rendered as a spinnable geodesic sphere. Selecting a facet glides it to the center and repaints the sphere with similar but distinct OKLab neighbors — hue rotates around the anchor, lightness shifts into its headroom, chroma swings with distance, and neutral anchors bloom into tints. Selecting the pinned facet again unsets the value.",
    name: "BriolettePicker",
    props: [
      {
        description:
          "Controlled hex color value, or null when nothing is selected. Supplying a hex from outside re-anchors the sphere around the nearest facet and glides it to center.",
        name: "value",
        type: "string | null",
      },
      {
        description: "Called with the facet's hex color on selection, or null when unset.",
        name: "onChange",
        type: "(value: string | null) => void",
      },
      {
        defaultValue: '"base"',
        description:
          "Facet density of the sphere — coarse is 20 facets, base is 80, fine is 180, brilliant is 320. Changing the cut animates: the finer geometry grows out of the coarser one. Seam width scales with the cut.",
        name: "density",
        type: '"coarse" | "base" | "fine" | "brilliant"',
      },
      {
        defaultValue: "1",
        description:
          "Seam visibility from 0 (a seamless gem) to 1 (full seams). Strokes blend toward each facet's own fill, so edges stay crack-free at every opacity.",
        name: "seamOpacity",
        type: "number",
      },
      {
        description: "Seam color between facets. Defaults to the canvas white.",
        name: "seamColor",
        type: "string",
      },
      {
        defaultValue: '"Color"',
        description: "Accessible name for the sphere stage.",
        name: "label",
        type: "string",
      },
      {
        defaultValue: "true",
        description: "Shows the selected hex output beneath the sphere.",
        name: "showValue",
        type: "boolean",
      },
      {
        defaultValue: "280",
        description: "Rendered sphere size in pixels.",
        name: "size",
        type: "number",
      },
    ],
  },
  {
    description:
      "Pure geometry and palette helpers, computed with @instruments/colorscope, for custom renderers.",
    name: "Utilities",
    props: [
      {
        description: "Builds the 80 facets of the frequency-2 geodesic icosahedron.",
        name: "buildBrioletteFaces",
        type: "() => BrioletteFace[]",
      },
      {
        description: "Rotates, culls, and projects facets into SVG polygon points.",
        name: "projectBrioletteFaces",
        type: "(faces, orientation) => BrioletteProjectedFace[]",
      },
      {
        description: "Computes every facet's hex for the universe or a refinement view.",
        name: "buildBriolettePalette",
        type: "(faces, view) => string[]",
      },
      {
        description: "Maps a facet direction to the at-rest color universe.",
        name: "brioletteUniverseColor",
        type: "(direction) => string",
      },
    ],
  },
];

const brioletteExample = `import { BriolettePicker } from "@patternmode/briolette";
import "@patternmode/briolette/styles.css";

export function AccentColorField() {
  const [color, setColor] = useState<string | null>(null);

  return (
    <BriolettePicker
      aria-label="Accent color"
      value={color}
      onChange={setColor}
    />
  );
}`;

export default function BriolettePage() {
  return (
    <ComponentDocsShell
      description="A spinnable geodesic color sphere. At rest it shows the whole color universe; each selection repaints the facets with similar but distinct OKLab neighbors of your color."
      title="Briolette"
    >
      <BrioletteDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/briolette</CodeBlock>
        <CodeBlock>{brioletteExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={brioletteApi} />
      </DocsBlock>
    </ComponentDocsShell>
  );
}
