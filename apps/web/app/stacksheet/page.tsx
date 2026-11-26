import type { ApiSection } from "@/components/docs-blocks";
import { DocsBlock } from "@/components/docs-blocks";

import { PackageDocs } from "@/components/package-docs";
import { StacksheetDemo } from "@/components/stacksheet-demo";
import { StacksheetVariants } from "@/components/stacksheet-variants";
import { StacksheetExamples } from "@/components/stacksheet-examples";
import { componentMetadata } from "@/lib/catalogue";

export const metadata = componentMetadata("stacksheet");

const stacksheetApi: ApiSection[] = [
  {
    description: "Creates an isolated sheet stack instance.",
    name: "createStacksheet",
    props: [
      {
        description:
          "Side, width, height, modal behavior, drag settings, snap points, and spring presets.",
        name: "config",
        type: "StacksheetConfig",
      },
      {
        description:
          "Wraps the app and renders the stack portal. Pass registered sheets and optional class overrides.",
        name: "StacksheetProvider",
        type: "Component",
      },
      {
        description: "Returns open, push, navigate, replace, swap, pop, and close actions.",
        name: "useSheet",
        type: "Hook",
      },
      {
        description:
          'Per-Sheet options, the last argument to open, push, replace and navigate: ariaLabel, and height ("full" or "fit"; fit sizes a bottom Sheet to its content, up to 85dvh).',
        name: "options",
        type: "SheetPresentationOptions",
      },
    ],
  },
  {
    description: "Composable Sheet Parts for custom layouts.",
    name: "Sheet",
    props: [
      {
        description: "Sheet regions with scroll and drag handling.",
        name: "Header / Body / Footer",
        type: "Components",
      },
      {
        description: "Built-in navigation controls for nested stacks.",
        name: "Back / Close",
        type: "Components",
      },
    ],
  },
];

const stacksheetExample = `import { createStacksheet } from "@patternmode/stacksheet";
import "@patternmode/stacksheet/styles.css";

const { StacksheetProvider, useSheet } = createStacksheet<{
  Settings: { title: string };
}>();

function OpenSettings() {
  const { open } = useSheet();
  return (
    <button onClick={() => open("Settings", "settings", { title: "Settings" })}>
      Open
    </button>
  );
}`;

export default function StacksheetPage() {
  return (
    <PackageDocs
      api={stacksheetApi}
      caption="Two sheets deep. The root sheet steps back; Back pops, Escape pops, Close clears the stack."
      demo={<StacksheetDemo />}
      example={stacksheetExample}
      installLead="Create the stack once, wrap the app in its provider, then open sheets from any component."
      readMore="Read the package README for callbacks, snap points, accessibility, and styling details."
      slug="stacksheet"
      variants={<StacksheetVariants />}
    >
      <DocsBlock title="Examples">
        <StacksheetExamples />
      </DocsBlock>
    </PackageDocs>
  );
}
