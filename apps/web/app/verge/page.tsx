import { ApiTable, CodeBlock, ComponentDocsShell, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { VergeDemo } from "@/components/verge-demo";

export const metadata: Metadata = {
  description: "A reserved slot whose controls reveal on hover, on focus, and always on touch.",
  title: "Verge | Patternmode",
};

const vergeApi: ApiSection[] = [
  {
    description:
      "The container whose hover and focus state the slots read. Wrap the whole row, not just the controls — the reveal responds to the user addressing the row. Contributes no appearance of its own.",
    name: "Verge.Root",
    props: [
      {
        defaultValue: '"div"',
        description:
          "Element or component to render as, so a row inside a list can be an li and a cell can be a td.",
        name: "as",
        type: "ElementType",
      },
    ],
  },
  {
    description: "The reserved area holding the controls.",
    name: "Verge.Slot",
    props: [
      {
        description:
          "How many controls' worth of width to hold open. Only needed when controls must align into a column across rows carrying different numbers of them. Width per control comes from --patternmode-verge-slot-size.",
        name: "slots",
        type: "number",
      },
      {
        defaultValue: "false",
        description:
          "Keeps the slot revealed regardless of pointer or focus, for state the CSS cannot see such as an action mid-flight. Not an escape hatch for one row mattering more — a control drawn on every row at rest is furniture.",
        name: "visible",
        type: "boolean",
      },
      {
        defaultValue: '"div"',
        description: "Element or component to render as.",
        name: "as",
        type: "ElementType",
      },
    ],
  },
];

const vergeExample = `import { Verge } from "@patternmode/verge";
import "@patternmode/verge/styles.css";

export function FinishRow({ finish }) {
  return (
    <Verge.Root as="li">
      <span>{finish.name}</span>
      <Verge.Slot slots={2}>
        <IconButton label="Rename" />
        <OverflowMenu />
      </Verge.Slot>
    </Verge.Root>
  );
}`;

const hitAreaExample = `/* Verge reserves the slot; it does not own your button. On touch the
   controls are permanently visible, so each needs a 48x48px hit area. */
@custom-variant pointer-fine (@media (pointer: fine));`;

export default function VergePage() {
  return (
    <ComponentDocsShell
      description="A reserved slot whose controls rest hidden and reveal on hover, on focus, and always on touch — holding their space throughout, so nothing moves."
      title="Verge"
    >
      <VergeDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/verge</CodeBlock>
        <CodeBlock>{vergeExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="What it already handles">
        <ApiTable
          sections={[
            {
              description:
                "Registries ship the button, the dropdown and the tooltip — the things being revealed. None ships the contract governing when they appear, which is where hand-rolled versions drift apart.",
              name: "The reveal contract",
              props: [
                {
                  description:
                    "Tabbing into the row reveals the slot, via :focus-within on the root. Children stay in the tab order at rest, which is what lets focus arrive at all. Spelling this focus-visible is the defect that recurs: it reveals the overflow menu two elements away but not the checkbox beside it.",
                  name: "Keyboard",
                  type: ":focus-within",
                },
                {
                  description:
                    "No hover exists on a touch surface, so nothing hides. Handled with a media query, not a tap handler. Controls also take a wider gap on coarse pointers, because permanently-visible controls 2px apart are not separable by a thumb.",
                  name: "Touch",
                  type: "@media (hover: none)",
                },
                {
                  description:
                    "A slot holding an open menu, popover or disclosure stays revealed, so the overflow control does not vanish when the pointer travels to the menu it just opened.",
                  name: "Open menus",
                  type: '[data-popup-open] | [data-state="open"] | [aria-expanded="true"]',
                },
                {
                  description:
                    "Only opacity and pointer-events change. The slot occupies its space at rest and revealed alike, so the row's geometry never shifts under the pointer.",
                  name: "Layout stability",
                  type: "opacity + pointer-events",
                },
                {
                  description:
                    "Roots may nest. A nested root shadows its ancestor's state for its own subtree, so pointing at an outer row does not reveal an inner row's controls.",
                  name: "Nesting",
                  type: "inherited custom properties",
                },
                {
                  description: "The transition is dropped under prefers-reduced-motion: reduce.",
                  name: "Reduced motion",
                  type: "@media (prefers-reduced-motion: reduce)",
                },
              ],
            },
          ]}
        />
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={vergeApi} />
      </DocsBlock>
      <DocsBlock title="What you must handle: touch hit areas">
        <CodeBlock>{hitAreaExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Theming">
        <ApiTable
          sections={[
            {
              description: "Every knob is a custom property, so retune without forking.",
              name: "Custom properties",
              props: [
                {
                  defaultValue: "1.75rem",
                  description: "Width one control reserves, used by slots.",
                  name: "--patternmode-verge-slot-size",
                  type: "length",
                },
                {
                  defaultValue: "120ms",
                  description: "Reveal transition duration.",
                  name: "--patternmode-verge-duration",
                  type: "time",
                },
                {
                  defaultValue: "cubic-bezier(0.2, 0, 0, 1)",
                  description: "Reveal transition easing.",
                  name: "--patternmode-verge-easing",
                  type: "easing-function",
                },
              ],
            },
          ]}
        />
      </DocsBlock>
    </ComponentDocsShell>
  );
}
