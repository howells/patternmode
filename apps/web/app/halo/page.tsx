import type { ApiSection } from "@howells/site-ui";

import { HaloDemo, HaloVariants } from "@/components/halo-demo";
import { PackageDocs } from "@/components/package-docs";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("halo");

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
        type: "(value: HslColor) => void",
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

const haloExample = `import { HaloPicker } from "@patternmode/halo";
import "@patternmode/halo/styles.css";
import type { HslColor } from "@patternmode/system";

export function AccentColorField() {
  const [color, setColor] = useState<HslColor>({ h: 16, s: 48, l: 69 });

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
    <PackageDocs
      api={haloApi}
      demo={<HaloDemo />}
      example={haloExample}
      installLead="Controlled. Hold the HSL value in state and pass it back in."
      slug="halo"
      variants={<HaloVariants />}
    />
  );
}
