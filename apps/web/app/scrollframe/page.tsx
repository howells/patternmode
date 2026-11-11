import type { ApiSection } from "@howells/site-ui";

import { ScrollFrameDemo } from "@/components/scrollframe-demo";
import { PackageDocs } from "@/components/package-docs";
import { ScrollFrameVariants } from "@/components/scrollframe-variants";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("scrollframe");

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

<ScrollFrame aria-label="Activity" className="h-96">
  {items.map((item) => (
    <ActivityRow key={item.id} item={item} />
  ))}
</ScrollFrame>

<ScrollFrame axes="horizontal" scrollbars="hidden" controls scrollStep="page">
  {children}
</ScrollFrame>`;

export default function ScrollFramePage() {
  return (
    <PackageDocs
      api={scrollFrameApi}
      caption="Scrolled partway on both axes, so both edges fade. At either end that fade goes."
      demo={<ScrollFrameDemo />}
      example={scrollFrameExample}
      installLead="Wrap any list. For custom layouts, compose the parts under ScrollFrame.Root."
      slug="scrollframe"
      variants={<ScrollFrameVariants />}
    />
  );
}
