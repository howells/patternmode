import { ChannelDemo, ChannelSizes, ChannelVariants } from "@/components/channel-demo";
import type { ApiSection } from "@/components/docs-blocks";
import { PackageDocs } from "@/components/package-docs";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("channel");

const channelApi: ApiSection[] = [
  {
    description:
      "A horizontal gradient channel with inset glass thumbs. Colour maths and expensive commit work stay in your app.",
    name: "ChannelSlider",
    props: [
      {
        description:
          "Accessible name. In a range the thumbs append start and end, unless thumbLabels renames them.",
        name: "label",
        required: true,
        type: "string",
      },
      {
        description: "CSS background for the track, such as a colour gradient.",
        name: "background",
        required: true,
        type: "string",
      },
      {
        defaultValue: '"base"',
        description:
          "Channel height on the extended Patternmode size scale Swatch also uses. Width fills the container.",
        name: "size",
        type: '"2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"',
      },
      {
        description: "Visible caption under the start of the track.",
        name: "labelStart",
        type: "string",
      },
      {
        description: "Visible caption under the end of the track.",
        name: "labelEnd",
        type: "string",
      },
      {
        description: "Names for the two range thumbs when start and end are not meaningful.",
        name: "thumbLabels",
        type: "readonly [string, string]",
      },
      {
        description:
          "Asks your app how the thumb should contrast with the colour at this value. Nothing assumes the ramp runs light to dark.",
        name: "getThumbColor",
        type: "(value: number, index: number) => string",
      },
      {
        description: "Describes a value in your own words, such as warmer rather than a number.",
        name: "getValueText",
        type: "(value: number, index: number) => string",
      },
      {
        description:
          "Merged onto the slider root. The rules sit in a layer, so your utilities win.",
        name: "className",
        type: "string",
      },
      {
        description: "Merged onto the slider root, after the channel's own custom properties.",
        name: "style",
        type: "CSSProperties",
      },
    ],
  },
  {
    description:
      "Value and behaviour props pass through to Base UI's Slider.Root. A number gives one thumb; a two-number tuple gives a range.",
    name: "Slider value",
    props: [
      {
        description: "Controlled value: a number, or a readonly two-number tuple for a range.",
        name: "value",
        type: "number | readonly [number, number]",
      },
      {
        description: "Initial value for uncontrolled use.",
        name: "defaultValue",
        type: "number | readonly [number, number]",
      },
      {
        description: "Called on every move. Update local state here.",
        name: "onValueChange",
        type: "(value, eventDetails) => void",
      },
      {
        description: "Called when a drag or key press ends. Run expensive work here.",
        name: "onValueCommitted",
        type: "(value, eventDetails) => void",
      },
      {
        defaultValue: "0",
        description: "Lowest value.",
        name: "min",
        type: "number",
      },
      {
        defaultValue: "100",
        description: "Highest value.",
        name: "max",
        type: "number",
      },
      {
        defaultValue: "1",
        description: "How far an arrow key moves a thumb.",
        name: "step",
        type: "number",
      },
      {
        defaultValue: "10",
        description: "How far Page Up, Page Down and Shift with an arrow key move a thumb.",
        name: "largeStep",
        type: "number",
      },
      {
        defaultValue: "0",
        description: "Smallest gap between range thumbs, in steps.",
        name: "minStepsBetweenValues",
        type: "number",
      },
      {
        defaultValue: '"none"',
        description: "What range thumbs do when they meet. Base UI's own default is push.",
        name: "thumbCollisionBehavior",
        type: '"push" | "swap" | "none"',
      },
      {
        defaultValue: "false",
        description: "Stops the slider taking input.",
        name: "disabled",
        type: "boolean",
      },
      {
        description: "Form field name and owning form, for submitting the value.",
        name: "name, form",
        type: "string",
      },
    ],
  },
];

const channelExample = `import { ChannelSlider } from "@patternmode/channel";
import "@patternmode/channel/styles.css";

<ChannelSlider
  label="Lightness"
  background="linear-gradient(to right, #fff, #000)"
  size="xl"
  value={lightness}
  onValueChange={setLightness}
  onValueCommitted={search}
  getThumbColor={(value) => value < 50 ? "#000" : "#fff"}
  labelStart="Lighter"
  labelEnd="Darker"
/>`;

export default function ChannelPage() {
  return (
    <PackageDocs
      api={channelApi}
      demo={<ChannelDemo />}
      example={channelExample}
      installLead="Update local state on every move. Run expensive work in onValueCommitted."
      slug="channel"
      variants={
        <>
          <ChannelVariants />
          <ChannelSizes />
        </>
      }
    />
  );
}
