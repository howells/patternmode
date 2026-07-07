import { ApiTable, CodeBlock, ComponentDocsShell, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { ScrollFrameDemo } from "@/components/scrollframe-demo";

export const metadata: Metadata = {
  description: "Base UI-backed scroll frames with eased edge fades and movement controls.",
  title: "ScrollFrame | Patternmode",
};

const scrollFrameApi: ApiSection[] = [
  {
    description: "Base UI-backed scroll container with measured fades and movement controls.",
    name: "ScrollFrame",
    props: [
      {
        defaultValue: '"vertical"',
        description: "Chooses the supported scroll axes.",
        name: "axes",
        type: '"vertical" | "horizontal" | "both"',
      },
      {
        defaultValue: "true",
        description: "Controls measured eased edge fades.",
        name: "fades",
        type: 'boolean | "none" | "start" | "end" | "both" | AxisFadeConfig',
      },
      {
        description: "CSS color used by the fade overlays.",
        name: "fadeColor",
        type: "string",
      },
      {
        description: "Size of the fade overlay along the scroll axis.",
        name: "fadeSize",
        type: "number | string",
      },
      {
        defaultValue: '"auto"',
        description:
          "Controls scrollbar visibility; hidden and always keep the scroll plumbing mounted.",
        name: "scrollbars",
        type: '"auto" | "always" | "hover" | "hidden"',
      },
      {
        defaultValue: "false",
        description: "Adds overflow-aware previous and next movement controls.",
        name: "controls",
        type: "boolean | ScrollFrameControlsConfig",
      },
      {
        defaultValue: "false",
        description:
          "Enables pointer drag scrolling while preserving native scroll and text selection until a drag threshold is crossed.",
        name: "dragScroll",
        type: "boolean | ScrollFrameDragScrollConfig",
      },
      {
        defaultValue: '"page"',
        description: "Controls movement distance for previous and next controls.",
        name: "scrollStep",
        type: '"page" | number | ((state, axis) => number)',
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
    <ComponentDocsShell
      description="Base UI-backed scroll frames with reliable plumbing, eased edge fades, hidden or visible scrollbars, and overflow-aware movement controls."
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
    </ComponentDocsShell>
  );
}
