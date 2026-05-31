import {
  type ApiSection,
  ApiTable,
  CodeBlock,
  ComponentPage,
  DocsBlock,
} from "@howells/site-ui";
import type { Metadata } from "next";
import { ScrollFrameDemo } from "@/components/scrollframe-demo";

export const metadata: Metadata = {
  title: "ScrollFrame | Patternmode",
  description:
    "Radix-backed scroll frames with eased edge fades and movement controls.",
};

const scrollFrameApi: ApiSection[] = [
  {
    name: "ScrollFrame",
    description:
      "Radix-based scroll container with measured fades and movement controls.",
    props: [
      {
        name: "axes",
        type: '"vertical" | "horizontal" | "both"',
        defaultValue: '"vertical"',
        description: "Chooses the supported scroll axes.",
      },
      {
        name: "fades",
        type: 'boolean | "none" | "start" | "end" | "both" | AxisFadeConfig',
        defaultValue: "true",
        description: "Controls measured eased edge fades.",
      },
      {
        name: "fadeColor",
        type: "string",
        description: "CSS color used by the fade overlays.",
      },
      {
        name: "fadeSize",
        type: "number | string",
        description: "Size of the fade overlay along the scroll axis.",
      },
      {
        name: "scrollbars",
        type: '"auto" | "always" | "hover" | "hidden"',
        defaultValue: '"auto"',
        description:
          "Controls scrollbar visibility while keeping Radix scroll plumbing mounted.",
      },
      {
        name: "controls",
        type: "boolean | ScrollFrameControlsConfig",
        defaultValue: "false",
        description: "Adds overflow-aware previous and next movement controls.",
      },
      {
        name: "dragScroll",
        type: "boolean | ScrollFrameDragScrollConfig",
        defaultValue: "false",
        description:
          "Enables pointer drag scrolling while preserving native scroll and text selection until a drag threshold is crossed.",
      },
      {
        name: "scrollStep",
        type: '"page" | number | ((state, axis) => number)',
        defaultValue: '"page"',
        description:
          "Controls movement distance for previous and next controls.",
      },
    ],
  },
];

const scrollFrameExample = `import { ScrollFrame } from "@patternmode/scrollframe";
import "@patternmode/scrollframe/styles.css";

function MaterialStrip() {
  return (
    <ScrollFrame
      aria-label="Materials"
      axes="horizontal"
      dragScroll
      fadeColor="var(--surface)"
      scrollbars="hidden"
    >
      {materials.map((material) => (
        <Tag key={material}>{material}</Tag>
      ))}
    </ScrollFrame>
  );
}`;

export default function ScrollFramePage() {
  return (
    <ComponentPage
      description="Radix-backed scroll frames with reliable plumbing, eased edge fades, hidden or visible scrollbars, and overflow-aware movement controls."
      title="ScrollFrame"
    >
      <ScrollFrameDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/scrollframe</CodeBlock>
        <CodeBlock>{scrollFrameExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={scrollFrameApi} />
      </DocsBlock>
    </ComponentPage>
  );
}
