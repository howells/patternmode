import { ApiTable, CodeBlock, ComponentPage, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { HaloDemo } from "@/components/halo-demo";

export const metadata: Metadata = {
  description: "Round saturation and lightness color picker with a compact hue smile arc.",
  title: "Halo | Patternmode",
};

const haloApi: ApiSection[] = [
  {
    description: "Controlled HSL picker with a circular saturation/lightness pad and hue arc.",
    name: "HaloPicker",
    props: [
      {
        description: "Controlled HSL value.",
        name: "value",
        type: "{ h: number; s: number; l: number }",
      },
      {
        description: "Called with the next HSL value after pad or arc pointer input.",
        name: "onChange",
        type: "(value: HaloColor) => void",
      },
      {
        defaultValue: "true",
        description: "Shows the computed hex output beneath the picker.",
        name: "showValue",
        type: "boolean",
      },
      {
        defaultValue: '"Color"',
        description: "Hidden legend used when no aria-label is supplied.",
        name: "label",
        type: "string",
      },
    ],
  },
  {
    description: "Pure helpers for custom readouts and non-standard renderers.",
    name: "Utilities",
    props: [
      {
        description: "Converts HSL values to a clamped hex color.",
        name: "hslToHex",
        type: "(h, s, l) => string",
      },
      {
        description: "Maps saturation/lightness values to pad handle coordinates.",
        name: "getHaloPadHandlePosition",
        type: "(s, l) => { x, y }",
      },
      {
        description: "Maps hue to the smile arc handle coordinates.",
        name: "getHaloHueHandlePosition",
        type: "(h) => { x, y }",
      },
    ],
  },
];

const haloExample = `import { HaloPicker, type HaloColor } from "@patternmode/halo";
import "@patternmode/halo/styles.css";

export function AccentColorField() {
  const [color, setColor] = useState<HaloColor>({ h: 16, s: 48, l: 69 });

  return (
    <HaloPicker
      aria-label="Accent color"
      value={color}
      onChange={setColor}
    />
  );
}`;

export default function HaloPage() {
  return (
    <ComponentPage
      description="A round saturation/lightness picker with the little hue smile arc from Materia."
      title="Halo"
    >
      <HaloDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/halo</CodeBlock>
        <CodeBlock>{haloExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={haloApi} />
      </DocsBlock>
    </ComponentPage>
  );
}
